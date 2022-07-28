const Accommodation = require("./accommodation.model");

const createAccommodation = async ({ web, location, startDate, endDate, phone, email, resourceType, idTravel, idUser}) => {
    return await Accommodation.create({ web, location, startDate, endDate,phone, email,resourceType, idTravel, idUser });
  };

  const findAll = async () => {
      return await Accommodation.find().lean().exec();
  };

  const findByTravelId = async(_idTravel)=>{
    return await Accommodation.findOne({ idTravel: _idTravel })
  }

  const findOneById = async(id)=>{
    return await Accommodation.findOne({ _id: id })
  }


  module.exports = {createAccommodation,findAll,findByTravelId, findOneById };