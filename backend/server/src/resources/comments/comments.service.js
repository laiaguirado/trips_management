const Comment = require("./comments.model");

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

module.exports = { createOne, findAll, deleteComment, findByTravelId, findByCompId };
