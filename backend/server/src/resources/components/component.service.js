const mongoose = require("mongoose");
const { Component } = require("./component.model");

const TYPE_RESOURCE = {
  TRANSPORT: "transportation",
  ACCOMMODATION: "accommodation",
  RESTAURANT: "restoration",
  PLANS: "plans",
};

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

const findComponent = async (id) => {
  const filterBy = id
    ? {
        $match: { _id: { $eq: mongoose.Types.ObjectId(id) } },
      }
    : { $match: {} };
  const component = await Component.aggregate(
    [
      {
        $unionWith: {
          coll: "plans",
          pipeline: [filterBy],
        },
      },
      {
        $unionWith: {
          coll: "accommodations",
          pipeline: [filterBy],
        },
      },
      {
        $unionWith: {
          coll: "transportations",
          pipeline: [filterBy],
        },
      },
      {
        $unionWith: {
          coll: "restorations",
          pipeline: [filterBy],
        },
      },
    ],
    function (err, result) {
      //    console.log(result);
      //  console.log(err);
    }
  );
  return component[0];
};

module.exports = { findComponentById, getScores, TYPE_RESOURCE, findComponent };
