const mongoose = require("mongoose");
const { runTransaction, isValidParameter } = require("../../../helper");
const { errMalformed } = require("../../../errors");
const Restoration = require("./restoration.model");
const Travel = require("../../travel/travel.model");
const Comment = require("../../comments/comments.model");
const User = require("../../users/user.model");
const Score = require("../../score/score.model");
const { getScores } = require("../component.service");

const paramValueInclude = ["totalScore"];

const addFirstScore = async (idRestaurant, idScore, score) => {
  const restaurantUpdated = await Restoration.findOneAndUpdate(
    { _id: idRestaurant },
    { $push: { scores: idScore } },
    { new: true, useFindAndModify: false, runValidators: true }
  );
  //Modify the total score. Since there is only one vote, we will not calculate it with the aggregate function
  restaurantUpdated.totalScore = {
    average: score,
    votes: 1,
    points: score,
  };
  return restaurantUpdated;
};

const createOne = async (data) => {
  return await Restoration.create(data);
};

const findAll = async () => {
  return await Restoration.find()
    .lean({ getters: true, virtuals: true })
    .exec();
};
const deleteRest = async (_id) => {
  await Travel.findOneAndUpdate(
    { restaurants: _id },
    {
      $pull: { restaurants: { $in: _id } },
    },
    { new: true }
  );
  await Comment.deleteMany({ idComponent: _id }).exec();
  await Score.deleteMany({ idComponent: _id }).exec();

  const restoration = await runTransaction(async () => {
    const deleted = await Restoration.findByIdAndDelete({ _id })
      .lean()
      .exec()
      .then();
    if (deleted === null) {
      errMalformed(`Restoration not found`);
    }

    const travel = await Travel.findOneAndUpdate(
      { _id: deleted.idTravel },
      { $pull: { restaurants: _id } },
      { new: true, useFindAndModify: false }
    );
    return deleted;
  });
  return restoration;
};

const getOne = async (idRestaurant, idUser, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo))
    errMalformed("Wrong query parameter");

  const rest = await Restoration.findOne({ _id: idRestaurant })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .populate({
      path: "scores",
      match: { idUser: { $eq: mongoose.Types.ObjectId(idUser) } },
      select: "score",
    })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (rest === null) {
    errMalformed(`Restoration not found`);
  }

  if (additionalInfo === "totalScore") {
    const total = await getScores(Restoration, idRestaurant);
    if (total.length === 1) {
      rest.totalScore = total[0];
    }
  }

  return rest;
};

const findOneById = async (id) => {
  return await Restoration.findOne({ _id: id });
};
const findOne = async (_id) => {
  const rest = await Restoration.findOne({ _id }).lean().exec();

  if (rest === null) {
    errMalformed(`Restoration not found`);
  }
  return rest;
};

const getByTravelId = async (idTravel, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo)) {
    errMalformed("Wrong query parameter");
  }

  const restaurantList = await Restoration.find({ idTravel })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (restaurantList && additionalInfo === "totalScore") {
    const totales = await getScores(Restoration);

    if (totales) {
      const completRestaurants = restaurantList.map((restaurantAct) => {
        return {
          ...restaurantAct,
          totalScore: {
            ...totales.find((total) =>
              mongoose.Types.ObjectId(total._id).equals(
                mongoose.Types.ObjectId(restaurantAct._id)
              )
            ),
          },
        };
      });
      return completRestaurants;
    }
  }

  return restaurantList;
};

const updateRestaurant = async (_id, data) => {
  const restUpdated = await Restoration.findOneAndUpdate({ _id }, data, {
    new: true,
    runValidators: true,
  })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (restUpdated === null) {
    errMalformed(`Restoration not found`);
  }
  return restUpdated;
};

module.exports = {
  createOne,
  deleteRest,
  findAll,
  getOne,
  getByTravelId,
  updateRestaurant,
  findOne,
  findOneById,
  addFirstScore,
};
