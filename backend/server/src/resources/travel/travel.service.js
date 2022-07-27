const Travel = require("./travel.model");
const { errMalformed } = require("../../errors");

const getTravelByUser = async (_id) => {
  return Travel.find({ _id }).lean().exec();
};

const getAllTravel = async () => {
  return Travel.find().lean().exec();
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
  const travelUpdated = await Travel.findByIdAndUpdate(
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

module.exports = {
  createTravel,
  updateTravel,
  getTravelByUser,
  getAllTravel,
  deleteTravel,
};
