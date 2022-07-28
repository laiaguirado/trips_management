const Travel = require("./travel.model");
const User = require("../users/user.model");
const { errMalformed } = require("../../errors");
const { runTransaction } = require("../../helper");

const getTravelById = async (_id) => {
  return Travel.find({ _id })
    .populate({ path: "travellers", select: "email username" })
    .populate({ path: "creator", select: "email -_id" })
    .lean()
    .exec();
};

const getAllTravel = async () => {
  return Travel.find()
    .populate({ path: "travellers", select: "email username -travels" })
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
  const deleted = await Travel.findByIdAndDelete({ _id }).lean().exec();
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
    );

    const user = await User.findOneAndUpdate(
      { _id: idUser },
      { $push: { travels: idTravel } },
      { new: true, useFindAndModify: false, runValidators: true }
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
};
