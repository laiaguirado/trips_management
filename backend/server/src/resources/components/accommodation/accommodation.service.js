const Accommodation = require("./accommodation.model");

const createAccommodation = async ({ web, location, startDate, endDate, phone, email, resourceType, idTravel, idUser}) => {
    return await Accommodation.create({ web, location, startDate, endDate,phone, email,resourceType, idTravel, idUser });
  };
  module.exports = {createAccommodation };