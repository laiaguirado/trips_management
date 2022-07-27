const mongoose = require("mongoose");
const { TripManagementApiError } = require("../../errors");

const capitalize = (val) => {
  if (typeof val !== "string") val = "";
  val = val.toLowerCase().trim();
  return val.charAt(0).toUpperCase() + val.substring(1);
};

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true,
      required: [true, "{PATH} is required"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Wrong email format"],
      immutable: true,
    },
    password: {
      type: String,
      required: [true, "{PATH} is required"],
      select: false,
    },
    username: {
      type: String,
      required: [true, "{PATH} is required"],
      trim: true,
      maxlength: [50, "'{PATH}' is too long. Max. 50 characters"],
      match: [/^[a-zA-Z0-9\s]*$/, "'username' is invalid"],
      set: capitalize,
    },
    scores:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"score"
    }]
  },
  { timestamps: true }
);

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyValue.email != null) {
      next(new TripManagementApiError(400, "User exists"));
    }
  } else {
    next(error);
  }
});

userSchema.index({ email: 1 });
const User = mongoose.model("user", userSchema);

module.exports = User;
