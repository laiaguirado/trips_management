const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const { componentSchema } = require("../component.model");
const { capitalize } = require("../../../helper");

const plansSchema = extendSchema(componentSchema, {
  name: {
    type: String,
    maxlength: [50, "{PATH} is too long"],
    match: [/^[a-zA-Z0-9\s]*$/, "{PATH} is invalid"],
    required: [true, "{PATH} is required"],
    set: capitalize,
  },
  location: {
    type: String,
    required: false,
    maxlength: [1000, "{PATH} is too long"],
  },
  openingHour: {
    type: String,
    required: false, //TODO Validar formato HH:MM
  },
  closingHour: {
    type: String,
    required: false, //TODO Validar formato HH:MM
  },
  closed: {
    type: String,
    required: false,
    maxlength: [500, "{PATH} is too long"],
  },
  web: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    uniqueCaseInsensitive: true,
    required: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, " '{VALUE}' is invalid"],
    immutable: true,
  },
  priceAdult: {
    type: Number, //TODO CAMBIAR EL TIPO!!!
  },
  priceChildren: {
    type: Number, //TODO CAMBIAR EL TIPO!!!
  },
  discount: {
    type: String, //TODO formato
  },
  notation: {
    type: String,
    maxlength: [500, "'{PATH}' is too long"],
  },
  duration: {
    type: String,
  },
});

plansSchema.index({ type: 1 });

const Plans = mongoose.model("plans", plansSchema);

module.exports = Plans;
