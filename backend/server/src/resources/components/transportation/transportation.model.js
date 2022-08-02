const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const { componentSchema } = require("../component.model");
const { capitalize } = require("../../helper");

const transportationSchema = extendSchema(componentSchema, {
  name: {
    type: String,
    maxlength: [50, "{PATH} is too long"],
    match: [/^[a-zA-Z0-9\s]*$/, "{PATH} is invalid"],
    required: [true, "{PATH} is required"],
    set: capitalize,
  },
  price: {
    type: string, //TODO CAMBIAR EL TIPO!!!
  },
  type: {
    type: string,
    enum:{ ["airplane", "ship", "car", "subway", "tram", "bus", "train"], message: "{VALUE} for {TYPE} is not suported"},
    default: "airplane",
    required:[true, "{PATH} is required"]
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
  phone: {
    type: Number,
    trim: true,
    match: [/^[0-9\s]*$/, "{PATH} is invalid"],
  },
  notation: {
    type: string,
    maxlength: [500, "'{PATH}' is too long"],
  },
  email: {
    type: String,
    uniqueCaseInsensitive: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, " '{PATH}' is invalid"],
  },
});

transportationSchema.index({ name: 1 });
transportationSchema.index({ type: 1 });

const Transportation = mongoose.model("transportation", transportationSchema);

module.exports = Transportation;
