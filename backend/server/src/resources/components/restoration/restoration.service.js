const { runTransaction } = require("../../../helper");
const { errMalformed } = require("../../../errors");
const Restoration = require("./restoration.model");
const Travel = require("../../travel/travel.model");
const User = require("../../users/user.model");

const createOne = async (
  {
    web,
    description,
    location,
    phone,
    email,
    resourceType,
    kindOfFood,
    minPrice,
    currencyMinPrice,
    maxPrice,
    currencyMaxPrice,
  },
  idUser,
  idTravel
) => {
  return await Restoration.create({
    web,
    description,
    location,
    phone,
    email,
    resourceType,
    kindOfFood,
    minPrice,
    currencyMinPrice,
    maxPrice,
    currencyMaxPrice,
    idUser,
    idTravel,
  });
};

const findAll = async () => {
  return await Restoration.find().lean().exec();
};
const deleteRest = async (_id) => {
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

const getOne = async (_id) => {
  const rest = await Restoration.findOne({ _id });

  if (rest === null) {
    errMalformed(`Restoration not found`);
  }
  return rest;
};
const getByTravelId = async (idTravel) => {
  return await Restoration.find({ idTravel }).exec();
};

const updateRestoration = async ({
  _id,
  web,
  description,
  location,
  phone,
  email,
  kindOfFood,
  minPrice,
  maxPrice,
}) => {
  const restUpdated = await Restoration.findOneAndUpdate(
    { _id },
    {
      web,
      description,
      location,
      phone,
      email,
      kindOfFood,
      minPrice,
      maxPrice,
    },
    { new: true }
  )
    .lean()
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
};
