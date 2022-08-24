const mongoose = require("mongoose");
const mongooseLeanGetters = require("mongoose-lean-getters");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const extendSchema = require("mongoose-extend-schema");
const { componentSchema } = require("../component.model");
const { capitalize, getPrice, setPrice, getPriceWithCurrency } = require("../../../helper");

function getPriceChildrenWithCurrency() {
  return getPriceWithCurrency(this.priceChildren, this.currency);
}

function getPriceAdultWithCurrency() {
  return getPriceWithCurrency(this.priceAdult, this.currency);
}

const plansSchema = extendSchema(componentSchema, {
  name: {
    type: String,
    maxlength: [50, "{PATH} is too long"],
    required: [true, "{PATH} is required"],
    set: capitalize,
  },
  location: {
    type: String,
    required: [true, "{PATH} is required"],
    maxlength: [200, "{PATH} is too long"],
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
    required: false,
    trim: true,
  },
  email: {
    type: String,
    uniqueCaseInsensitive: true,
    required: false,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, " '{VALUE}' is invalid"],
    immutable: true,
  },
  priceAdult: {
    type: Number,
    get: getPrice,
    set: setPrice,
  },
  priceChildren: {
    type: Number,
    get: getPrice,
    set: setPrice,
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
plansSchema.plugin(mongooseLeanGetters);
plansSchema.plugin(mongooseLeanVirtuals);
plansSchema.virtual("priceAdultWithCurrency").get(getPriceAdultWithCurrency);
plansSchema.virtual("priceChildrenWithCurrency").get(getPriceChildrenWithCurrency);

const Plans = mongoose.model("plans", plansSchema);

module.exports = Plans;
