const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    idTravel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "travel",
    },
    idComponent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "component",
    },
    comment: {
      type: String,
      maxlength: [250, "'{PATH}' is too long"],
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model("comment", commentsSchema);

module.exports = Comment;