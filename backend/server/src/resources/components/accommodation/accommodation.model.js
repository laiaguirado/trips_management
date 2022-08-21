const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const mongooseLeanGetters = require("mongoose-lean-getters");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const { componentSchema } = require("../component.model");
const {
  capitalize,
  getPrice,
  setPrice,
  getPriceWithCurrency,
} = require("../../../helper");

function getPriceAccommodationWithCurrency() {
  return getPriceWithCurrency(this.price, this.currency);
}

const accommodationSchema = extendSchema(componentSchema, {
  name: {
    type: String,
    required: true,
  },
  notation: {
    type: String,
    maxlength: [250, "'{PATH}' is too long"],
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  web: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  email: {
    type: String,
    uniqueCaseInsensitive: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, " '{PATH}' is invalid"],
    immutable: true,
  },
  price: {
    type: Number
  },
  petFriendly: {
    type: Boolean
  },
  checkInHour: {
    type: String
  },
  checkOutHour: {
    type: String
  },
  internet: {
    type: Boolean
  },
  swimmingPool: {
    type: Boolean
  },
  type: {
    type: String
  }
},
  {
    toJSON: { getters: true, setters: true, virtuals: true },
    toObject: { getters: true, setters: true, virtuals: true },
    runSettersOnQuery: true,
  });

accommodationSchema.index({ phone: 1 });
accommodationSchema.plugin(mongooseLeanGetters);
accommodationSchema.plugin(mongooseLeanVirtuals);
accommodationSchema.virtual("priceWithCurrency").get(getPriceAccommodationWithCurrency);

const Accommodation = mongoose.model("accommodation", accommodationSchema);

module.exports = Accommodation;
