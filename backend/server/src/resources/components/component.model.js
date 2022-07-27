const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");

const componentSchema = mongoose.Schema(
    {
      resourceType: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        immutable: true,
      },
      idTravel: {
        type: String,
        required: true,
      },
      idUser: {
        type: String,
        required: true,
      },
      comments:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"comment"}
      ],
   
   
    idTravel: {
      type: String,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Component = mongoose.model("component", componentSchema);
module.exports = { Component, componentSchema };
