const Accommodation = require("./accommodation.model");
const Travel = require("../../travel/travel.model")
const { errMalformed } = require("../../../errors");

const createAccommodation = async (acomodation) => {
  return await Accommodation.create(acomodation);
};

const findAll = async () => {
  return await Accommodation.find().lean().exec();
};

const findByTravelId = async (_idTravel) => {
  return await Accommodation.find({ idTravel: _idTravel }).exec();
};

const findOneById = async (id) => {
  return await Accommodation.findOne({ _id: id });
};

const deleteAccom = async (_id) => {
  await Travel.findOneAndUpdate({ accommodations: _id }, {
    $pull: { accommodations: { $in: _id }},
}, {new:true});

  const deleted = await Accommodation.findByIdAndDelete({ _id }).lean().exec();
  if (deleted === null) {
    errMalformed(`Accommodation not found`);
  }
  return deleted;
};

const updateAccomodation = async (_id, accommodationData) => {
  const accomUpdated = await Accommodation.findOneAndUpdate({ _id }, accommodationData, { new: true }).lean().exec();

  if (accomUpdated === null) {
    errMalformed(`Accomodation not found`);
  }
  return accomUpdated;
};


module.exports = { createAccommodation, findAll, findByTravelId, findOneById, deleteAccom ,updateAccomodation};