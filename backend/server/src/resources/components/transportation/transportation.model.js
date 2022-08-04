const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const { componentSchema } = require("../component.model");
const { capitalize } = require("../../../helper");

const transportationSchema = extendSchema(componentSchema, {
  name: {
    type: String,
    maxlength: [50, "{PATH} is too long"],
    match: [/^[a-zA-Z0-9\s]*$/, "{PATH} is invalid"],
    required: [true, "{PATH} is required"],
    set: capitalize,
  },
  price: {
    type: Number, //TODO CAMBIAR EL TIPO!!!
  },
  type: {
    type: String,
    enum: {
      values: ["airplane", "ship", "car", "subway", "tram", "bus", "train"],
      message: "{VALUE} for {TYPE} is not suported",
    },
    default: "airplane",
    required: [true, "{PATH} is required"],
  },
  web: {
    type: String,
    trim: true,
  },
  origin: {
    type: String,
    maxlength: [100, "'{PATH}' is too long"],
  },
  destination: {
    type: String,
    maxlength: [100, "'{PATH}' is too long"],
  },
  notation: {
    type: String,
    maxlength: [500, "'{PATH}' is too long"],
  },
  typeDetails: {
    type: String,
    maxlength: [500, "'{PATH}' is too long"],
  },
  departure: {
    type: Date,
  },
  arrival: {
    type: Date,
  },
});

transportationSchema.index({ type: 1 });

const Transportation = mongoose.model("transportation", transportationSchema);

module.exports = Transportation;
