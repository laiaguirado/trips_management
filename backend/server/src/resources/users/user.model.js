const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const capitalize = (val) => {
  if (typeof val !== "string") val = "";
  val = val.toLowerCase();
  return val.charAt(0).toUpperCase() + val.substring(1);
};

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true,
      required: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, " '{VALUE}' is invalid"],
      immutable: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: [true, "{PATH} is required"],
      trim: true,
      maxlength: [50, "'{VALUE}' is too long"],
      match: [/^[a-zA-Z0-9]+$/, " '{VALUE}' is invalid"],
      set: capitalize,
    },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator, {
  message: "Error, Value '{VALUE}' duplicate. Expected  {PATH} to be {TYPE}.",
});
userSchema.index({ email: 1 });

const User = mongoose.model("user", userSchema);

module.exports = User;
