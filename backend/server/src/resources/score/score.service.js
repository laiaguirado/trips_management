const Score = require("./score.model");
const Travel = require("../travel/travel.model");
const User = require("../users/user.model")
const { errMalformed } = require("../../errors");

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
  await Travel.findOneAndUpdate({ scores: _id }, {
    $pull: { scores: { $in: _id }},
}, {new:true});
await User.findOneAndUpdate({ scores: _id }, {
  $pull: { scores: { $in: _id }},
}, {new:true});

  const deleted = await Score.findByIdAndDelete({ _id }).lean().exec();
  if (deleted === null) {
    errMalformed(`Score with ${id} not found`);
  }
  return deleted;
};

const findByTravelId = async (idTravel) => {
  return await Score.find({idTravel: idTravel })
  .populate({ path: "idUser", select: "email username" })
  .lean()
  .exec();;
};

const findByCompId = async (idComponent) => {
  return await Score.find({ idComponent }).exec();
};

module.exports = { createOne, findAll, deleteScore, findByTravelId, findByCompId };
