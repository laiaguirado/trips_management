const mongoose = require("mongoose");
const { Component } = require("./component.model");

const findComponentById = async (idComp) => {
  try {
    return await Component.findOne({ _id: idComp });
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
};

const getScores = async (model, id) => {
  const filterBy = id
    ? {
        $match: { _id: { $eq: mongoose.Types.ObjectId(id) } },
      }
    : { $match: {} };

  const totales = await model.aggregate(
    [
      {
        $lookup: {
          from: "scores",
          localField: "scores",
          foreignField: "_id",
          as: "resultingArray",
        },
      },
      { $unwind: "$resultingArray" },
      {
        $group: {
          _id: "$_id",
          average: { $avg: "$resultingArray.score" },
          points: { $sum: "$resultingArray.score" },
          votes: { $sum: 1 },
        },
      },
      filterBy,
    ],
    function (err, result) {
      // console.log(result);
      // console.log(err);
    }
  );
  return totales;
};

module.exports = { findComponentById, getScores };
