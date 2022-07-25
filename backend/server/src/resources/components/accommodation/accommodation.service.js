const Accommodation = require("./accommodation.model");

const createAccommodation = async ({ web, location, startDate, endDate, phone, email, resourceType, idTravel, idUser}) => {
    return await Accommodation.create({ web, location, startDate, endDate,phone, email,resourceType, idTravel, idUser });
  };

  const findAll = async () => {
    try{
      return await Accommodation.find().lean().exec();
    }catch (e){
      console.log(e);
      res.status(500).json({ error: 'Internal error' });
    }
  };

  const findByTravelId = async(_idTravel)=>{
    try{
    return await Accommodation.findOne({ idTravel: _idTravel })
    } catch(e){
      console.log(e);
      res.status(500).json({ error: 'Internal error' });
    }
  }
  module.exports = {createAccommodation,findAll,findByTravelId };