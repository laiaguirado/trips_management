const Restoration = require("./restoration.model");

const createOne = async ({ web, description, location, phone, email, resourceType, kindOfFood, minPrice,maxPrice},idUser,idTravel) => {
    return await Restoration.create({ web, description, location, phone, email, resourceType, kindOfFood, minPrice,maxPrice,idUser,idTravel });
  };

module.exports = {createOne}