const mongoose = require("mongoose");
const Transportation = require("./transportation.model");
const Travel = require("../../travel/travel.model");
const Comment = require("../../comments/comments.model");
const { runTransaction, isValidParameter } = require("../../../helper");
const { errMalformed } = require("../../../errors");
const Score = require("../../score/score.model");

const paramValueInclude = ["totalScore"];

const createTransport = async (transport) => {
  const transportation = await runTransaction(async () => {
    const transportCreated = await Transportation.create(transport);

    const travel = await Travel.findOneAndUpdate(
      { _id: transport.idTravel },
      { $push: { transportation: transportCreated._id } },
      { new: true, useFindAndModify: false, runValidators: true }
    );
    return transportCreated;
  });
  return transportation;
};

const getScores = async (idTransportation) => {
  const filterBy = idTransportation
    ? {
        $match: { _id: { $eq: mongoose.Types.ObjectId(idTransportation) } },
      }
    : { $match: {} };

  const totales = await Transportation.aggregate(
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

const getAllTransportationByTravel = async (idTravel, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo)) {
    errMalformed("Wrong query parameter");
  }

  const transports = await Transportation.find({ idTravel })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email id" })
    .populate({ path: "idTravel", select: "name" })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (transports && additionalInfo === "totalScore") {
    const totales = await getScores();

    if (totales) {
      const completTransports = transports.map((actualTransport) => {
        return {
          ...actualTransport,
          totalScore: {
            ...totales.find((total) =>
              mongoose.Types.ObjectId(total._id).equals(
                mongoose.Types.ObjectId(actualTransport._id)
              )
            ),
          },
        };
      });
      return completTransports;
    }
  }

  return transports;
};

const addFirstScore = async (idTransportation, idScore, score) => {
  const transportationUpdated = await Transportation.findOneAndUpdate(
    { _id: idTransportation },
    { $push: { scores: idScore } },
    { new: true, useFindAndModify: false, runValidators: true }
  );
  //Modify the total score. Since there is only one vote, we will not calculate it with the aggregate function
  transportationUpdated.totalScore = {
    average: score,
    votes: 1,
    points: score,
  };
  return transportationUpdated;
};

const getTransportationById = async (
  idTransportation,
  idUser,
  additionalInfo
) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo))
    errMalformed("Wrong query parameter");

  const transport = await Transportation.findOne({ _id: idTransportation })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email id" })
    .populate({ path: "idTravel", select: "name" })
    .populate({
      path: "scores",
      match: { idUser: { $eq: mongoose.Types.ObjectId(idUser) } },
      select: "score -_id",
    })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (transport === null) {
    errMalformed(`Transportation not found`);
  }

  if (additionalInfo === "totalScore") {
    const total = await getScores(idTransportation);
    if (total.length === 1) {
      transport.totalScore = total[0];
    }
  }

  return transport;
};

const findOneById = async (id) => {
  return await Transportation.findOne({ _id: id });
};

const getOne = async (_id) => {
  const transp = await Transportation.findOne({ _id });

  if (transp === null) {
    errMalformed(`Transportation not found`);
  }
  return transp;
};

const deleteTransportation = async (_id) => {
  const transport = await runTransaction(async () => {
    await Comment.deleteMany({ idComponent: _id }).exec();
    await Score.deleteMany({ idComponent: _id }).exec();
    const deleted = await Transportation.findByIdAndDelete({ _id })
      .lean()
      .exec();

    if (deleted === null) {
      errMalformed(`Transportation not found`);
    }

    const travel = await Travel.findOneAndUpdate(
      { _id: deleted.idTravel },
      { $pull: { transportation: _id } },
      { new: true, useFindAndModify: false }
    );

    return deleted;
  });
  return transport;
};

const updateTransportation = async (_id, transportInfo) => {
  const transportationUpdated = await Transportation.findOneAndUpdate(
    { _id },
    transportInfo,
    { new: true }
  )
    .lean({ getters: true, virtuals: true })
    .exec();

  if (transportationUpdated === null) {
    errMalformed(`Transportation not found`);
  }
  return transportationUpdated;
};

module.exports = {
  createTransport,
  getAllTransportationByTravel,
  getTransportationById,
  deleteTransportation,
  updateTransportation,
  getOne,
  findOneById,
  addFirstScore,
};
