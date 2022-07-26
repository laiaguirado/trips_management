const Travel = require("./travel.model");
const User = require("../users/user.model");
const { errMalformed, TripManagementApiError } = require("../../errors");
const { runTransaction } = require("../../helper");

const getTravelById = async (_id) => {
  const travel = await Travel.findOne({ _id })
    .populate({ path: "travellers", select: "-_id" })
    .populate({ path: "travellers.user", select: "email username" })
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
    .populate({ path: "travellers", select: "-_id" })
    .populate({ path: "travellers.user", select: "email username" })
    .populate({ path: "creator", select: "email -_id" })
    .lean()
    .exec();
};

const createTravel = async (travel) => {
  return await Travel.create(travel);
};

const updateTravel = async (_id, dataTravel) => {
  const travelUpdated = await Travel.findOneAndUpdate({ _id }, dataTravel, {
    new: true,
  })
    .populate({ path: "travellers", select: "-_id" })
    .populate({ path: "travellers.user", select: "email username" })
    .populate({ path: "creator", select: "email -_id" })
    .lean()
    .exec();

  if (travelUpdated === null) {
    errMalformed(`Travel not found`);
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
    errMalformed(`Travel not found`);
  }
  return deleted;
};

const addUserToTravel = async (idTravel, idUser, type) => {
  const travel = await runTransaction(async () => {
    const infoTravel = { user: idUser, type };

    const isInTravel = await isTraveler(idTravel, idUser);
    if (isInTravel) {
      throw new TripManagementApiError(403, "User already in the travel");
    }
    const travel = await Travel.findOneAndUpdate(
      { _id: idTravel },
      { $push: { travellers: infoTravel } },
      { new: true, useFindAndModify: false, runValidators: true }
    )
      .populate({ path: "travellers", select: "-_id" })
      .populate({ path: "travellers.user", select: "email username" })
      .populate({ path: "creator", select: "email -_id" })
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

const isTraveler = async (idTravel, idUser) => {
  const travel = await Travel.findOne({
    _id: idTravel,
    travellers: { $elemMatch: { user: idUser } },
  });
  return travel !== null;
};

const deleteUserToTravel = async (idTravel, idUser) => {
  const travel = await runTransaction(async () => {
    const travel = await Travel.findOneAndUpdate(
      { _id: idTravel },
      { $pull: { travellers: { user: idUser } } },
      { new: true, useFindAndModify: false }
    )
      .populate({ path: "travellers", select: "-_id" })
      .populate({ path: "travellers.user", select: "email username" })
      .populate({ path: "creator", select: "email -_id" })
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
  isTraveler,
};
