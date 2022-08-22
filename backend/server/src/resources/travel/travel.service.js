const Travel = require("./travel.model");
const User = require("../users/user.model");
const { errMalformed } = require("../../errors");
const { runTransaction } = require("../../helper");

const getTravelById = async (_id) => {
  const travel = await Travel.findOne({ _id })
    .populate({ path: "travellers", select: "email username" })
    .populate({ path: "creator", select: "email -_id" })
    .lean()
    .exec();

  if (travel === null) {
    errMalformed("Travel doesn't exists!");
  }
  return travel;
};

const findTravel = async (_idTravel) => {
  const travel = await Travel.findOne({ _id: _idTravel });
  if (travel === null) {
    errMalformed("Travel doesn't exists!");
  }

  return travel;
};

const getAllTravel = async () => {
  return Travel.find()
    .populate({ path: "travellers", select: "email username" })
    .populate({ path: "creator", select: "email -_id" })
    .lean()
    .exec();
};

const createTravel = async (travel) => {
  return await Travel.create(travel);
};

const updateTravel = async ({
  _id,
  name,
  description,
  startDate,
  endDate,
  location,
}) => {
  const travelUpdated = await Travel.findOneAndUpdate(
    { _id },
    { name, description, startDate, endDate, location }
  )
    .lean()
    .exec();

  if (travelUpdated === null) {
    errMalformed(`Travel with id '${_id}' not found`);
  }
  return travelUpdated;
};

const deleteTravel = async (_id) => {
  const deleted = await Travel.findOneAndDelete(
    { _id },
    { runValidators: true }
  )
    .lean()
    .exec();
  if (deleted === null) {
    errMalformed(`Travel with '${_id}' not found`);
  }
  return deleted;
};

const addUserToTravel = async (idTravel, idUser) => {
  const travel = await runTransaction(async () => {
    const travel = await Travel.findOneAndUpdate(
      { _id: idTravel },
      { $push: { travellers: idUser } },
      { new: true, useFindAndModify: false, runValidators: true }
    )
      .populate({ path: "travellers", select: "email username" })
      .lean()
      .exec();

    const user = await User.findOneAndUpdate(
      { _id: idUser },
      { $push: { travels: idTravel } },
      { new: true, useFindAndModify: false, runValidators: true }
    );
    return travel;
  });
  return travel;
};

const deleteUserToTravel = async (idTravel, idUser) => {
  const travel = await runTransaction(async () => {
    const travel = await Travel.findOneAndUpdate(
      { _id: idTravel },
      { $pull: { travellers: idUser } },
      { new: true, useFindAndModify: false }
    )
      .populate({ path: "travellers", select: "email username" })
      .lean()
      .exec();

    const user = await User.findOneAndUpdate(
      { _id: idUser },
      { $pull: { travels: idTravel } },
      { new: true, useFindAndModify: false }
    );
    return travel;
  });
  return travel;
};

module.exports = {
  createTravel,
  updateTravel,
  getTravelById,
  getAllTravel,
  deleteTravel,
  addUserToTravel,
  deleteUserToTravel,
  findTravel,
};
