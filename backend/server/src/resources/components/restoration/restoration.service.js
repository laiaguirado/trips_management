const { errMalformed } = require("../../../errors");
const Restoration = require("./restoration.model");

const createOne = async ({ web, description, location, phone, email, resourceType, kindOfFood, minPrice,maxPrice},idUser,idTravel) => {
    return await Restoration.create({ web, description, location, phone, email, resourceType, kindOfFood, minPrice,maxPrice,idUser,idTravel });
  };

  const findAll = async () => {
    return await Restoration.find().lean().exec();
};
  const deleteRest = async(_id) =>{
    const deleted = await Restoration.findByIdAndDelete({_id}).lean().exec();
    if (deleted === null){
        errMalformed(`Restoration with ${id} not found`);
    }
    return deleted
  }

module.exports = {createOne,deleteRest,findAll}