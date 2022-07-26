const Score = require("./score.model");
const { errMalformed } = require("../../errors");
const { default: mongoose } = require("mongoose");

const createOne = async (value, compId, user_id, idTravel) => {
  return await Score.create({
    score: value,
    idComponent: compId,
    idUser: user_id,
    idTravel: mongoose.Types.ObjectId(idTravel),
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

const updateScore = async (_id, data) => {
  const scoreUpdated = await Score.findOneAndUpdate({ _id }, data, {
    new: true,
  })
    .lean()
    .exec();

  if (scoreUpdated === null) {
    errMalformed(`Score not found`);
  }
  return scoreUpdated;
};

const findByTravelId = async (idTravel) => {
  return await Score.find({ idTravel: idTravel })
    .populate({ path: "idUser", select: "email username" })
    .lean()
    .exec();
};

const findByCompId = async (idComponent) => {
  return await Score.find({ idComponent })
    .populate({ path: "idUser", select: "email username" })
    .lean()
    .exec();
};

module.exports = {
  createOne,
  findAll,
  deleteScore,
  findByTravelId,
  findByCompId,
  updateScore,
};
