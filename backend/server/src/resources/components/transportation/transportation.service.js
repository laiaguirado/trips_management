const mongoose = require("mongoose");
const Transportation = require("./transportation.model");
const Travel = require("../../travel/travel.model");
const Comment = require("../../comments/comments.model");
const { runTransaction, isValidParameter } = require("../../../helper");
const { errMalformed } = require("../../../errors");
const Score = require("../../score/score.model");
const { getScores } = require("../component.service");

const paramValueInclude = ["totalScore"];

const createTransport = async (transport) => {
  const transportOut = await runTransaction(async () => {
    const transportCreated = await Transportation.create(transport);

    const travel = await Travel.findOneAndUpdate(
      { _id: transport.idTravel },
      { $push: { transportation: transportCreated._id } },
      { new: true, useFindAndModify: false, runValidators: true }
    );
    return transportCreated;
  });
  return transportOut;
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
    const totales = await getScores(Transportation);

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

const addFirstScore = async (idTransport, idScore, score) => {
  const transportUpdated = await Transportation.findOneAndUpdate(
    { _id: idTransport },
    { $push: { scores: idScore } },
    { new: true, useFindAndModify: false, runValidators: true }
  );
  //Modify the total score. Since there is only one vote, we will not calculate it with the aggregate function
  transportUpdated.totalScore = {
    average: score,
    votes: 1,
    points: score,
  };
  return transportUpdated;
};

const getTransportationById = async (idTransport, idUser, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo))
    errMalformed("Wrong query parameter");

  const transport = await Transportation.findOne({ _id: idTransport })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email id" })
    .populate({ path: "idTravel", select: "name" })
    .populate({
      path: "scores",
      match: { idUser: { $eq: mongoose.Types.ObjectId(idUser) } },
      select: "score",
    })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (transport === null) {
    errMalformed(`Transportation not found`);
  }

  if (additionalInfo === "totalScore") {
    const total = await getScores(Transportation, idTransport);
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
  const transportUpdated = await Transportation.findOneAndUpdate(
    { _id },
    transportInfo,
    { new: true, runValidators: true }
  )
    .lean({ getters: true, virtuals: true })
    .exec();

  if (transportUpdated === null) {
    errMalformed(`Transportation not found`);
  }
  return transportUpdated;
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
