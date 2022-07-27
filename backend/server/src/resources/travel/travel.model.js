const mongoose = require("mongoose");
const { capitalize } = require("../../helper");

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
      maxlength: [1000, "{TYPE} is too long"],
    },
    location: {
      type: String,
      required: false,
      maxlength: [1000, "{TYPE} is too long"],
    },

    startDate: {
      type: Date,
      required: [true, "{TYPE} is required"],
    },
    endDate: {
      type: Date,
      required: [true, "{TYPE} is required"],
    },
  },
  { timestamps: true }
);

const Travel = mongoose.model("travel", travelSchema);

module.exports = Travel;
