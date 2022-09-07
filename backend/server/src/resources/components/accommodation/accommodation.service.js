const mongoose = require("mongoose");
const Accommodation = require("./accommodation.model");
const Travel = require("../../travel/travel.model");
const Comment = require("../../comments/comments.model");
const Score = require("../../score/score.model");
const { isValidParameter } = require("../../../helper");
const { errMalformed } = require("../../../errors");
const { getScores } = require("../component.service");

const paramValueInclude = ["totalScore"];

const createAccommodation = async (acomodation) => {
  return await Accommodation.create(acomodation);
};

const addFirstScore = async (idAccommodation, idScore, score) => {
  const accommodationUpdated = await Accommodation.findOneAndUpdate(
    { _id: idAccommodation },
    { $push: { scores: idScore } },
    { new: true, useFindAndModify: false, runValidators: true }
  );
  //Modify the total score. Since there is only one vote, we will not calculate it with the aggregate function
  accommodationUpdated.totalScore = {
    average: score,
    votes: 1,
    points: score,
  };
  return accommodationUpdated;
};
const findAll = async () => {
  return await Accommodation.find().lean().exec();
};

const findByTravelId = async (_idTravel, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo)) {
    errMalformed("Wrong query parameter");
  }

  const accommodation = await Accommodation.find({ idTravel: _idTravel })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .lean({ getters: true, virtuals: true })
    .exec();
  if (accommodation && additionalInfo === "totalScore") {
    const totales = await getScores(Accommodation);

    if (totales) {
      const completAccommodation = accommodation.map((accommodationAct) => {
        return {
          ...accommodationAct,
          totalScore: {
            ...totales.find((total) =>
              mongoose.Types.ObjectId(total._id).equals(
                mongoose.Types.ObjectId(accommodationAct._id)
              )
            ),
          },
        };
      });
      return completAccommodation;
    }
  }
  return accommodation;
};

const findOneById = async (id) => {
  return await Accommodation.findOne({ _id: id });
};
const findAccommodationById = async (id, idUser, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo))
    errMalformed("Wrong query parameter");

  const accommodation = await Accommodation.findOne({ _id: id })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .populate({
      path: "scores",
      match: { idUser: { $eq: mongoose.Types.ObjectId(idUser) } },
      select: "score",
    })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (accommodation === null) {
    errMalformed(`Accommodation not found`);
  }

  if (additionalInfo === "totalScore") {
    const total = await getScores(Accommodation, id);

    if (total.length === 1) {
      accommodation.totalScore = total[0];
    }
  }
  return accommodation;
};

const deleteAccom = async (_id) => {
  await Travel.findOneAndUpdate(
    { accommodations: _id },
    {
      $pull: { accommodations: { $in: _id } },
    },
    { new: true }
  );

  await Comment.deleteMany({ idComponent: _id }).exec();
  await Score.deleteMany({ idComponent: _id }).exec();

  const deleted = await Accommodation.findByIdAndDelete({ _id }).lean().exec();
  if (deleted === null) {
    errMalformed(`Accommodation not found`);
  }
  return deleted;
};

const updateAccomodation = async (_id, accommodationData) => {
  const accomUpdated = await Accommodation.findOneAndUpdate(
    { _id },
    accommodationData,
    { new: true }
  )
    .lean({ getters: true, virtuals: true, runValidators: true })
    .exec();

  if (accomUpdated === null) {
    errMalformed(`Accomodation not found`);
  }
  return accomUpdated;
};

module.exports = {
  createAccommodation,
  findAll,
  findByTravelId,
  findOneById,
  findAccommodationById,
  deleteAccom,
  updateAccomodation,
  addFirstScore,
};
