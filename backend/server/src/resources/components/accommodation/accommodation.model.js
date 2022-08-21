const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const { componentSchema } = require("../component.model");

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
  },
  priceWithCurrency:{
    type:String
  }

});

accommodationSchema.index({ phone: 1 });

const Accommodation = mongoose.model("accommodation", accommodationSchema);

module.exports = Accommodation;
