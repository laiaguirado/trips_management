const Score = require("./score.model");

const createOne = async (value, compId, user_id, idTravel) => {
  return await Score.create({
    score: value,
    idComponent: compId,
    idUser: user_id,
    idTravel: idTravel,
  });
};

const findAll = async () => {
  return await Score.find().lean().exec();
};

const deleteScore = async (_id) => {
  const deleted = await Score.findByIdAndDelete({ _id }).lean().exec();
  if (deleted === null) {
    errMalformed(`Score with ${id} not found`);
  }
  return deleted;
};

const findByTravelId = async (idTravel) => {
  return await Score.find({idTravel: idTravel }).exec();
};

module.exports = { createOne, findAll, deleteScore, findByTravelId };
