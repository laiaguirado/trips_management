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
    required: false,
    validate: {
      validator: (v) => {
        if (v === null || v === "") return true;
        return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(v);
      },
      message: (props) => "OpeningHour format is wrong",
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
    type: String,
  },
  notation: {
    type: String,
    maxlength: [500, "'{PATH}' is too long"],
  },
  duration: {
    type: String,
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

plansSchema.index({ type: 1 });
plansSchema.plugin(mongooseLeanGetters);
plansSchema.plugin(mongooseLeanVirtuals);
plansSchema.virtual("priceAdultWithCurrency").get(getPriceAdultWithCurrency);
plansSchema.virtual("priceChildrenWithCurrency").get(getPriceChildrenWithCurrency);

const Plans = mongoose.model("plans", plansSchema);

module.exports = Plans;
