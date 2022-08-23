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

function getPricePlansWithCurrency() {
  return getPriceWithCurrency(this.price, this.currency);
}

const transportationSchema = extendSchema(
  componentSchema,
  {
    name: {
      type: String,
      maxlength: [50, "{PATH} is too long"],
      required: [true, "{PATH} is required"],
      set: capitalize,
    },
    price: {
      type: Number,
      get: getPrice,
      set: setPrice,
    },
    type: {
      type: String,
      enum: {
        values: [
          "airplane",
          "ship",
          "car",
          "subway",
          "tram",
          "bus",
          "train",
          "other",
        ],
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
  },
  {
    toJSON: { getters: true, setters: true, virtuals: true },
    toObject: { getters: true, setters: true, virtuals: true },
    runSettersOnQuery: true,
  }
);

transportationSchema.index({ type: 1 });
transportationSchema.plugin(mongooseLeanGetters);
transportationSchema.plugin(mongooseLeanVirtuals);
transportationSchema.virtual("priceWithCurrency").get(getPricePlansWithCurrency);

const Transportation = mongoose.model("transportation", transportationSchema);

module.exports = Transportation;
