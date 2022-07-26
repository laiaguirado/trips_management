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

function getMaxPriceWithCurrency() {
  return getPriceWithCurrency(this.maxPrice, this.currency);
}

function getMinPriceWithCurrency() {
  return getPriceWithCurrency(this.minPrice, this.currency);
}

const restaurantSchema = extendSchema(componentSchema, {
  name: {
    type: String,
    maxlength: [50, "{PATH} is too long"],
    required: [true, "{PATH} is required"],
    set: capitalize,
  },
  web: {
    type: String,
    trim: true,
  },
  notation: {
    type: String,
    maxlength: [500, "'{PATH}' is too long"],
  },
  location: {
    type: String,
    required: [true, "{PATH} is required"],
    maxlength: [200, "{PATH} is too long"],
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
  },
  kindOfFood: {
    type: String,
  },
  minPrice: {
    type: Number,
    get: getPrice,
    set: setPrice,
  },
  maxPrice: {
    type: Number,
    get: getPrice,
    set: setPrice,
  },
  closed: {
    type: String,
  },
  speciality: {
    type: String,
  },
  takeAway: {
    type: Boolean,
  },
  reserved: {
    type: Boolean,
  },
  openingHour: {
    type: String,
    required: false,
    validate: {
      validator: (v) => {
        if (v === null || v === "") return true;
        return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(v);
      },
      message: (props) => "Opening hour format is wrong",
    },
  },
  closingHour: {
    type: String,
    required: false,
    validate: {
      validator: (v) => {
        if (v === null || v === "") return true;
        return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(v);
      },
      message: (props) => "ClosingHour format is wrong",
    },
  },
  totalScore: {
    average: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
});

restaurantSchema.index({ phone: 1 });
restaurantSchema.plugin(mongooseLeanGetters);
restaurantSchema.plugin(mongooseLeanVirtuals);
restaurantSchema.virtual("minPriceWithCurrency").get(getMinPriceWithCurrency);
restaurantSchema.virtual("maxPriceWithCurrency").get(getMaxPriceWithCurrency);

const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurant;
