const Comment = require("./comments.model");
const Travel = require("../travel/travel.model");
const User = require("../users/user.model")

const createOne = async (text, compId, _id,idTravel) => {
   return await Comment.create({
    comment: text,
    idComponent: compId,
    idUser: _id,
    idTravel

  }).then(
    comment => {
      const result = Comment.findById(comment._id)
        .populate({ path: "idUser", select: "email username" });
      return result;
    }
  );
};

const findAll = async () => {
  return await Comment.find()
  .populate({ path: "idUser", select: "email username" })
  .lean().exec();
};

const deleteComment = async (_id) => {
  await Travel.findOneAndUpdate({ comments: _id }, {
    $pull: { comments: { $in: _id }},
}, {new:true});

await User.findOneAndUpdate({ comments: _id }, {
  $pull: { comments: { $in: _id }},
}, {new:true});



  const deleted = await Comment.findByIdAndDelete({ _id }).lean().exec();
  if (deleted === null) {
    errMalformed(`Comment with ${id} not found`);
  }
  return deleted;
};

const findByTravelId = async (idTravel) => {
  return await Comment.find({ idTravel:idTravel })
  .populate({ path: "idUser", select: "email username" })
  .lean()
  .exec();
};

const findByCompId = async (idComponent) => {
  return await Comment.find({ idComponent })
  .populate({ path: "idUser", select: "email username" })
  .lean()
  .exec();
};

const findByTravelAndComp = async (idTravel,idComponent) => {
  return await Comment.find({ idComponent: idComponent, idTravel:idTravel })
  .populate({ path: "idUser", select: "email username" })
  .lean()
  .exec();
};

const updateComm = async (_id, commentData) => {
  const comentUpdated = await Comment.findOneAndUpdate({ _id }, commentData, { new: true }).lean().exec();

  if (comentUpdated === null) {
    errMalformed(`Comment not found`);
  }
  return comentUpdated;
};

module.exports = { createOne, findAll, deleteComment, findByTravelId, findByCompId, findByTravelAndComp, updateComm };
