const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const { needsAuthToken } = require("../users/auth/auth.middleware");

const Comment = require("./comments.service");
const Accomodation = require("../components/accommodation/accommodation.service")
const User = require("../users/user.service")
const Travel = require("../travel/travel.service");
const Restoration = require("../components/restoration/restoration.service")
const Transportation = require("../components/transportation/transportation.service")



const createAcom = async (req, res) => {
  const { idComp } = req.params;
  const { email, _id, username } = req.userInfo;
  const { comment_text } = req.body;
  const { travelId } = req.params;

  const comment = await Comment.createOne(comment_text, idComp, _id, travelId);
  const accommodation = await Accomodation.findOneById(idComp);

  const user = await User.findById(_id);
  const travel = await Travel.findTravel(travelId);

  accommodation.comments.push(comment);
  await accommodation.save()

  user.comments.push(comment);
  await user.save()

  travel.comments.push(comment);
  await travel.save()

  res.status(200).json(comment);

}

const createRest = async (req, res) => {
  const { idComp } = req.params;
  const { email, _id, username } = req.userInfo;
  const { comment_text } = req.body;
  const { travelId } = req.params;

  const comment = await Comment.createOne(comment_text, idComp, _id, travelId);
  const restoration = await Restoration.getOne(idComp);

  const user = await User.findById(_id);
  const travel = await Travel.findTravel(travelId);

  restoration.comments.push(comment);
  await restoration.save()

  user.comments.push(comment);
  await user.save()

  travel.comments.push(comment);
  await travel.save()

  res.status(200).json(comment);

}

const createTransp = async (req, res) => {
  const { idComp } = req.params;
  const { email, _id, username } = req.userInfo;
  const { comment_text } = req.body;
  const { travelId } = req.params;

  const comment = await Comment.createOne(comment_text, idComp, _id, travelId);
  const transportation = await Transportation.getOne(idComp);

  const user = await User.findById(_id);
  const travel = await Travel.findTravel(travelId);

  transportation.comments.push(comment);
  await transportation.save()

  user.comments.push(comment);
  await user.save()

  travel.comments.push(comment);
  await travel.save()

  res.status(200).json(comment);

}

const getAll = async (req, res) => {
  res.status(200).json(await Comment.findAll());
}

const deleteOne = async (req, res) => {
  const { _id } = req.params;
  res.status(200).json(await Comment.deleteComment(_id));
};

const getCommentsByTravel = async (req, res) => {
  const { idTravel } = req.params;
  res.status(200).json(await Comment.findByTravelId(idTravel));
}

const getCommentsByComponent = async (req, res) => {
  const { idComp } = req.params;
  res.status(200).json(await Comment.findByCompId(idComp));
}

const getCommentsByTravAndComp = async (req, res) => {
  const { idComp } = req.params;
  const { idTravel } = req.params;
  res.status(200).json(await Comment.findByTravelAndComp(idTravel, idComp));
}

const router = express.Router();

router.post("/travel/:travelId/accomodation/:idComp", needsAuthToken, catchErrors(createAcom));
router.post("/travel/:travelId/restaurant/:idComp", needsAuthToken, catchErrors(createRest));
router.post("/travel/:travelId/transportation/:idComp", needsAuthToken, catchErrors(createTransp));

router.get("/", needsAuthToken, catchErrors(getAll));
router.delete("/:_id", needsAuthToken, catchErrors(deleteOne));
router.get("/travel/:idTravel", needsAuthToken, catchErrors(getCommentsByTravel))
router.get("/component/:idComp", needsAuthToken, catchErrors(getCommentsByComponent))
router.get("/travel/:idTravel/component/:idComp", needsAuthToken, catchErrors(getCommentsByTravAndComp))

module.exports = router;