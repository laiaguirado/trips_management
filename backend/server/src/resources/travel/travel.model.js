const mongoose = require("mongoose");
const { capitalize, FKIntegrity } = require("../../helper");
const image = require("../../SchemaType/SchemaImageType");

mongoose.Schema.Types.Image = image;

const travelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "{PATH} is required"],
      trim: true,
      maxlength: [50, "{PATH} is too long"],
      match: [/^[a-zA-Z0-9\s]*$/, "{PATH} is invalid"],
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
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    image: {
      type: mongoose.Schema.Types.Image,
      validate: {
        validator: (v) => v,
        message: (props) => `Image is wrong`,
      },
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
    scores:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "score",
      }
    ],
    comments:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      }
    ],
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restoration",
        validate: {
          isAsync: true,
          validator: async function (v) {
            return await FKIntegrity(mongoose.model("restoration"), v).catch(
              (err) => false
            );
          },
          message: `Restaurant doesn't exist`,
        },
      },
    ],
  },
  { timestamps: true }
);

const Travel = mongoose.model("travel", travelSchema);

module.exports = Travel;
