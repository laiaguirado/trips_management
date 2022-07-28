const mongoose = require("mongoose");
const { capitalize, FKIntegrity } = require("../../helper");

const travelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "{PATH} is required"],
      trim: true,
      maxlength: [50, "{PATH} is too long"],
      match: [/^[a-zA-Z\s]*$/, "{PATH} is invalid"],
      set: capitalize,
    },
    description: {
      type: String,
      required: false,
      maxlength: [1000, "{PATH} is too long"],
    },
    location: {
      type: String,
      required: false,
      maxlength: [1000, "{PATH} is too long"],
    },

    startDate: {
      type: Date,
      required: [true, "{PATH} is required"],
    },
    endDate: {
      type: Date,
      required: [true, "{PATH} is required"],
    },
    travellers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        validate: {
          isAsync: true,
          validator: async function (v) {
            return await FKIntegrity(mongoose.model("user"), v).catch(
              (err) => false
            );
          },
          message: `User doesn't exist`,
        },
      },
    ],
  },
  { timestamps: true }
);

const Travel = mongoose.model("travel", travelSchema);

module.exports = Travel;
