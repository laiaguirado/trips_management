const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const { componentSchema } = require("../component.model");

const accommodationSchema = extendSchema(componentSchema, {
  web: {
    type: String,
    trim: true,
    required: true,
  },
  name:{
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
  price:{
    type:Number
  },
  petFriendly:{
    type:Boolean
  },
  checkInHour:{
    type:String
  },
  checkOutHour:{
    type:String
  },
  internet:{
    type:Boolean
  },
  swimmingPool:{
    type:Boolean
  },
  type:{
    type:String
  },

});

accommodationSchema.index({ phone: 1 });

const Accommodation = mongoose.model("accommodation", accommodationSchema);

module.exports = Accommodation;
