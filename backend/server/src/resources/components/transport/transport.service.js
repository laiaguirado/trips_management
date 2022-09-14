const mongoose = require("mongoose");
const Transport = require("./transport.model");
const Travel = require("../../travel/travel.model");
const Comment = require("../../comments/comments.model");
const { runTransaction, isValidParameter } = require("../../../helper");
const { errMalformed } = require("../../../errors");
const Score = require("../../score/score.model");
const { getScores } = require("../component.service");

const paramValueInclude = ["totalScore"];

const createTransport = async (transport) => {
  const transportOut = await runTransaction(async () => {
    const transportCreated = await Transport.create(transport);

    const travel = await Travel.findOneAndUpdate(
      { _id: transport.idTravel },
      { $push: { transport: transportCreated._id } },
      { new: true, useFindAndModify: false, runValidators: true }
    );
    return transportCreated;
  });
  return transportOut;
};

const getAllTransportByTravel = async (idTravel, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo)) {
    errMalformed("Wrong query parameter");
  }

  const transports = await Transport.find({ idTravel })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email id" })
    .populate({ path: "idTravel", select: "name" })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (transports && additionalInfo === "totalScore") {
    const totales = await getScores(Transport);

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
  const transportUpdated = await Transport.findOneAndUpdate(
    { _id: idTransport },
    { $push: { scores: idScore } },
    { new: true, useFindAndModify: false, runValidators: true }
  );

  transportUpdated.totalScore = {
    average: score,
    votes: 1,
    points: score,
  };
  return transportUpdated;
};

const getTransportById = async (idTransport, idUser, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo))
    errMalformed("Wrong query parameter");

  const transport = await Transport.findOne({ _id: idTransport })
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
    errMalformed(`Transport not found`);
  }

  if (additionalInfo === "totalScore") {
    const total = await getScores(Transport, idTransport);
    if (total.length === 1) {
      transport.totalScore = total[0];
    }
  }

  return transport;
};

const findOneById = async (id) => {
  return await Transport.findOne({ _id: id });
};

const getOne = async (_id) => {
  const transp = await Transport.findOne({ _id });

  if (transp === null) {
    errMalformed(`Transport not found`);
  }
  return transp;
};

const deleteTransport = async (_id) => {
  const transport = await runTransaction(async () => {
    await Comment.deleteMany({ idComponent: _id }).exec();
    await Score.deleteMany({ idComponent: _id }).exec();
    const deleted = await Transport.findByIdAndDelete({ _id }).lean().exec();

    if (deleted === null) {
      errMalformed(`Transport not found`);
    }

    const travel = await Travel.findOneAndUpdate(
      { _id: deleted.idTravel },
      { $pull: { transport: _id } },
      { new: true, useFindAndModify: false }
    );

    return deleted;
  });
  return transport;
};

const updateTransport = async (_id, transportInfo) => {
  const transportUpdated = await Transport.findOneAndUpdate(
    { _id },
    transportInfo,
    { new: true, runValidators: true }
  )
    .lean({ getters: true, virtuals: true })
    .exec();

  if (transportUpdated === null) {
    errMalformed(`Transport not found`);
  }
  return transportUpdated;
};

module.exports = {
  createTransport,
  getAllTransportByTravel,
  getTransportById,
  deleteTransport,
  updateTransport,
  getOne,
  findOneById,
  addFirstScore,
};
