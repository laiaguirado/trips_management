const Accommodation = require("./accommodation.model");
const Travel = require("../../travel/travel.model")

const createAccommodation = async ({ web, description, location, startDate, endDate, phone, email, resourceType }, idTravel, idUser) => {
  return await Accommodation.create({ web, description, location, startDate, endDate, phone, email, resourceType, idTravel, idUser });
};

const findAll = async () => {
  return await Accommodation.find().lean().exec();
};

const findByTravelId = async (_idTravel) => {
  return await Accommodation.find({ idTravel: _idTravel }).exec();
}

const findOneById = async (id) => {
  return await Accommodation.findOne({ _id: id })
}

const deleteAccom = async (_id) => {
  console.log(await Travel.find({accommodations: _id }))

  await Travel.findOneAndUpdate({ accommodations: _id }, {
    $pull: { accommodations: { $in: _id }},
}, {new:true});

  const deleted = await Accommodation.findByIdAndDelete({ _id }).lean().exec();
  if (deleted === null) {
    errMalformed(`Accommodation with '${_id}' not found`);
  }
  return deleted;
};

const updateAccomodation = async ({
  _id,
  web,
  description,
  location,
  startDate,
  endDate,
  phone,
 email
}) => {
  const accomUpdated = await Accommodation.findOneAndUpdate(
    { _id },
    {web, description, location,startDate,endDate, phone, email},{new:true}
  ).lean()
    .exec();

  if (accomUpdated === null) {
    errMalformed(`Accomodation with id '${_id}' not found`);
  }
  return accomUpdated;
};


module.exports = { createAccommodation, findAll, findByTravelId, findOneById, deleteAccom ,updateAccomodation};