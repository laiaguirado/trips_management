const { runTransaction } = require("../../../helper");
const { errMalformed } = require("../../../errors");
const Restoration = require("./restoration.model");
const Travel = require("../../travel/travel.model");
const User = require("../../users/user.model");

const createOne = async (data) => {
  return await Restoration.create(data);
};

const findAll = async () => {
  return await Restoration.find().lean({ getters: true, virtuals: true }).exec();
};
const deleteRest = async (_id) => {
  await Travel.findOneAndUpdate(
    { restaurants: _id },
    {
      $pull: { restaurants: { $in: _id } },
    },
    { new: true }
  );

  const restoration = await runTransaction(async () => {
    const deleted = await Restoration.findByIdAndDelete({ _id }).lean().exec().then();
    if (deleted === null) {
      errMalformed(`Restoration not found`);
    }

    const travel = await Travel.findOneAndUpdate({ _id: deleted.idTravel }, { $pull: { restaurants: _id } }, { new: true, useFindAndModify: false });
    return deleted;
  });
  return restoration;
};

const getOne = async (_id) => {
  const rest = await Restoration.findOne({ _id }).lean({ getters: true, virtuals: true }).exec();

  if (rest === null) {
    errMalformed(`Restoration not found`);
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

const getByTravelId = async (idTravel) => {
  return await Restoration.find({ idTravel }).lean({ getters: true, virtuals: true }).exec();
};

const updateRestoration = async (_id, data) => {
  const restUpdated = await Restoration.findOneAndUpdate({ _id }, data, {
    new: true,
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
  updateRestoration,
  findOne,
  findOneById
};
