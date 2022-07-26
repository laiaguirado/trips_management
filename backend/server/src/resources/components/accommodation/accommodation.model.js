const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const { componentSchema } = require("../component.model");

const accommodationSchema = extendSchema(componentSchema, {
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
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
});

accommodationSchema.index({ phone: 1 });

const Accommodation = mongoose.model("accommodation", accommodationSchema);

module.exports = Accommodation;
