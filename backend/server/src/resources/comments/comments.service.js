const Comment = require("./comments.model");
const Travel = require("../travel/travel.model")

const createOne = async (text, compId, _id,idTravel) => {
  return await Comment.create({
    comment: text,
    idComponent: compId,
    idUser: _id,
    idTravel

  });
};

const findAll = async () => {
  return await Comment.find().lean().exec();
};

const deleteComment = async (_id) => {
  await Travel.findOneAndUpdate({ comments: _id }, {
    $pull: { comments: { $in: _id }},
}, {new:true});

  const deleted = await Comment.findByIdAndDelete({ _id }).lean().exec();
  if (deleted === null) {
    errMalformed(`Comment with ${id} not found`);
  }
  return deleted;
};

const findByTravelId = async (idTravel) => {
  return await Comment.find({ idTravel:idTravel }).exec();
};

const findByCompId = async (idComponent) => {
  return await Comment.find({ idComponent }).exec();
};

const findByTravelAndComp = async (idTravel,idComponent) => {
  return await Comment.find({ idComponent: idComponent, idTravel:idTravel }).exec();
};

module.exports = { createOne, findAll, deleteComment, findByTravelId, findByCompId, findByTravelAndComp };
