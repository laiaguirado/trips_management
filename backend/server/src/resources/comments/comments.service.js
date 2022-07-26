const Comment = require("./comments.model");
const { default: mongoose } = require("mongoose");
const { errMalformed } = require("../../errors");
const { TYPE_RESOURCE } = require("../components/component.service.js");
const Transport = require("../components/transport/transport.model");
const Restaurant = require("../components/restaurant/restaurant.model");
const Accommodation = require("../components/accommodation/accommodation.model");
const Plans = require("../components/plans/plans.model");

const createOne = async (text, compId, _id, idTravel, resourceType) => {
  return await Comment.create({
    comment: text,
    idComponent: compId,
    idUser: _id,
    idTravel: mongoose.Types.ObjectId(idTravel),
    resourceType,
  }).then((comment) => {
    const result = Comment.findById(comment._id).populate({
      path: "idUser",
      select: "email username",
    });
    return result;
  });
};

const findAll = async () => {
  return await Comment.find()
    .populate({ path: "idUser", select: "email username" })
    .lean()
    .exec();
};

const deleteComment = async (_id) => {
  const deleted = await Comment.findByIdAndDelete({ _id }).lean().exec();
  if (deleted === null) {
    errMalformed(`Comment not found`);
  }
  let model = null;
  switch (deleted.resourceType) {
    case TYPE_RESOURCE.TRANSPORT:
      model = Transport;
      break;
    case TYPE_RESOURCE.RESTAURANT:
      model = Restaurant;
      break;
    case TYPE_RESOURCE.ACCOMMODATION:
      model = Accommodation;
      break;
    case TYPE_RESOURCE.PLANS:
      model = Plans;
      break;
  }
  if (model !== null) {
    const commentDeleted = await model.findOneAndUpdate(
      { comments: _id },
      {
        $pull: { comments: { $in: _id } },
      },
      { new: true }
    );
  }
  return deleted;
};

const findByTravelId = async (idTravel) => {
  return await Comment.find({ idTravel: idTravel })
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

const findCommentById = async (_id) => {
  return await Comment.findOne({ _id }).lean().exec();
};

const findByTravelAndComp = async (idTravel, idComponent) => {
  return await Comment.find({ idComponent: idComponent, idTravel: idTravel })
    .populate({ path: "idUser", select: "email username" })
    .lean()
    .exec();
};

const updateComm = async (_id, commentData) => {
  const comentUpdated = await Comment.findOneAndUpdate({ _id }, commentData, {
    new: true,
  })
    .lean()
    .exec();

  if (comentUpdated === null) {
    errMalformed(`Comment not found`);
  }
  return comentUpdated;
};

module.exports = {
  createOne,
  findAll,
  deleteComment,
  findByTravelId,
  findByCompId,
  findByTravelAndComp,
  updateComm,
  findCommentById,
};
