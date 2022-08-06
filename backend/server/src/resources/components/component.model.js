const mongoose = require("mongoose");

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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    scores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "score",
      },
    ],
    idTravel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "travel",
      required: true,
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Component = mongoose.model("component", componentSchema);
module.exports = { Component, componentSchema };
