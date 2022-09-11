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

const accommodationSchema = extendSchema(
  componentSchema,
  {
    name: {
      type: String,
      maxlength: [50, "{PATH} is too long"],
      required: [true, "{PATH} is required"],
      set: capitalize,
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
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    web: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
      validate: {
        validator: (v) => {
          return v <= 999999999;
        },
        message: (props) => "Wrong phone number",
      },
    },
    email: {
      type: String,
      uniqueCaseInsensitive: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, " '{PATH}' is invalid"],
    },
    price: {
      type: Number,
    },
    petFriendly: {
      type: Boolean,
    },
    checkInHour: {
      type: String,
      validate: {
        validator: (v) => {
          if (v === null || v === "") return true;
          return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(v);
        },
        message: (props) => "Check in hour format is wrong",
      },
    },
    checkOutHour: {
      type: String,
      validate: {
        validator: (v) => {
          if (v === null || v === "") return true;
          return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(v);
        },
        message: (props) => "Check out hour format is wrong",
      },
    },
    internet: {
      type: Boolean,
    },
    swimmingPool: {
      type: Boolean,
    },
    type: {
      type: String,
      enum: {
        values: [
          "Hotel",
          "Apartment",
          "Camping",
          "Bungalow",
          "Hostal",
          "Chalets",
          "Cottages",
          "Other",
          "",
        ],
        message: "{VALUE} for {TYPE} is not suported",
      },
    },
    breakfast: {
      type: Boolean,
    },
    board: {
      type: String,
      enum: {
        values: ["Full", "Half", null],
        message: "{VALUE} for {TYPE} is not suported",
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
  },
  {
    toJSON: { getters: true, setters: true, virtuals: true },
    toObject: { getters: true, setters: true, virtuals: true },
    runSettersOnQuery: true,
  }
);

accommodationSchema.index({ phone: 1 });
accommodationSchema.plugin(mongooseLeanGetters);
accommodationSchema.plugin(mongooseLeanVirtuals);
accommodationSchema.virtual("priceWithCurrency").get(getPriceAccommodationWithCurrency);

const Accommodation = mongoose.model("accommodation", accommodationSchema);

module.exports = Accommodation;
