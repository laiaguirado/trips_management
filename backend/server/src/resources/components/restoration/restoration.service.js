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

  const getOne = async(_id)=>{

    const rest = await Restoration.findOne({_id});
    if (rest === null){
      errMalformed(`Restoration with id '${_id}' not found`);
    }
    return rest;
  }
  const getByTravelId = async(idTravel)=>{
    return await Restoration.find({idTravel }).exec();
  }

  const updateRestoration = async ({
    _id,
    web,
    description,
    location,
    phone,
    email,
    kindOfFood,
    minPrice,
    maxPrice
  }) => {
    const restUpdated = await Restoration.findOneAndUpdate(
      { _id },
      {web, description,location,phone,email,kindOfFood,minPrice,maxPrice }
    ).lean()
      .exec();
  
    if (restUpdated === null) {
      errMalformed(`Restoration with id '${_id}' not found`);
    }
    return restUpdated;
  };

module.exports = {createOne,deleteRest,findAll,getOne,getByTravelId, updateRestoration}