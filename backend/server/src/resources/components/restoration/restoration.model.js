const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const mongooseLeanGetters = require("mongoose-lean-getters");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const { componentSchema } = require("../component.model");
const { getPrice, setPrice } = require("../../../helper");

function getMaxPriceWithCurrency() {
  return `${this.maxPrice} ${this.currencyMaxPrice}`;
}

function getMinPriceWithCurrency() {
  return `${this.minPrice} ${this.currencyMinPrice}`;
}

const restorationSchema = extendSchema(componentSchema, {
  web: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    maxlength: [250, "'{VALUE}' is too long"],
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
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
  kindOfFood: {
    type: String,
  },
  minPrice: {
    type: Number,
    get: getPrice,
    set: setPrice,
  },
  currencyMinPrice: {
    type: String,
    required: true,
    default: "€",
  },
  maxPrice: {
    type: Number,
    get: getPrice,
    set: setPrice,
  },
  currencyMaxPrice: {
    type: String,
    required: true,
    default: "€",
  },
});

restorationSchema.index({ phone: 1 });
restorationSchema.plugin(mongooseLeanGetters);
restorationSchema.plugin(mongooseLeanVirtuals);
restorationSchema.virtual("minPriceWithCurrency").get(getMinPriceWithCurrency);
restorationSchema.virtual("maxPriceWithCurrency").get(getMaxPriceWithCurrency);

const Restoration = mongoose.model("restoration", restorationSchema);

module.exports = Restoration;
