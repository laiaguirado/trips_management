const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  idTravel:{
    type: String
  },
  idComponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "component",
  },
  score:{
    type:Number,
    required:true,
    min:0,
    max:5
  }
});

const Score = mongoose.model("score", scoreSchema);
module.exports = Score;
