const Accommodation = require("./accommodation.model");

const createAccommodation = async ({ web, location, startDate, endDate, phone, email, resourceType}, idTravel, idUser) => {
    return await Accommodation.create({ web, location, startDate, endDate,phone, email,resourceType, idTravel, idUser });
  };

  const findAll = async () => {
      return await Accommodation.find().lean().exec();
  };

  const findByTravelId = async(_idTravel)=>{
    console.log(_idTravel)
    return await Accommodation.find({idTravel: _idTravel }).exec();
  }

  const findOneById = async(id)=>{
    return await Accommodation.findOne({ _id: id })
  }

  const deleteAccom = async (_id) => {
    const deleted = await Accommodation.findByIdAndDelete({ _id }).lean().exec();
    if (deleted === null) {
      errMalformed(`Accommodation with '${_id}' not found`);
    }
    return deleted;
  };


  module.exports = {createAccommodation,findAll,findByTravelId, findOneById,deleteAccom };