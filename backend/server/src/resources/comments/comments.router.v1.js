const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const { needsAuthToken } = require("../users/auth/auth.middleware");

const Comment = require("./comments.service");
const Accomodation = require("../components/accommodation/accommodation.service");
const User = require("../users/user.service");
const Travel = require("../travel/travel.service");
const Restoration = require("../components/restoration/restoration.service");
const Transportation = require("../components/transportation/transportation.service");
const Plan = require("../components/plans/plans.services");
const { TYPE_RESOURCE } = require("../components/component.service.js");

const createAcom = async (req, res) => {
  const { idComp } = req.params;
  const { email, _id, username } = req.userInfo;
  const { comment_text } = req.body;
  const { travelId } = req.params;

  const comment = await Comment.createOne(comment_text, idComp, _id, travelId);
  const accommodation = await Accomodation.findOneById(idComp);

  accommodation.comments.push(comment);
  await accommodation.save();

  res.status(200).json(comment);
};

const createRest = async (req, res) => {
  const { idComp } = req.params;
  const { email, _id, username } = req.userInfo;
  const { comment_text } = req.body;
  const { travelId } = req.params;
  const resourceType = TYPE_RESOURCE.RESTAURANT;

  const comment = await Comment.createOne(
    comment_text,
    idComp,
    _id,
    travelId,
    resourceType
  );
  const restoration = await Restoration.findOneById(idComp);

  restoration.comments.push(comment);
  await restoration.save();

  res.status(200).json(comment);
};

const createTransp = async (req, res) => {
  const { idComp } = req.params;
  const { email, _id, username } = req.userInfo;
  const { comment_text } = req.body;
  const { travelId } = req.params;
  const resourceType = TYPE_RESOURCE.TRANSPORT;

  const comment = await Comment.createOne(
    comment_text,
    idComp,
    _id,
    travelId,
    resourceType
  );
  const transportation = await Transportation.findOneById(idComp);

  transportation.comments.push(comment);
  await transportation.save();

  res.status(200).json(comment);
};

const createPlan = async (req, res) => {
  const { idComp } = req.params;
  const { email, _id, username } = req.userInfo;
  const { comment_text } = req.body;
  const { travelId } = req.params;

  const comment = await Comment.createOne(comment_text, idComp, _id, travelId);
  const plan = await Plan.findOneById(idComp);

  plan.comments.push(comment);
  await plan.save()

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

const updateComment= async (req, res) => {
  const data = req.body;
  const { _id } = req.params;

  res.status(200).json(await Comment.updateComm(_id, data));
};

const router = express.Router();

router.post("/travel/:travelId/accommodation/:idComp", needsAuthToken, catchErrors(createAcom));
router.post("/travel/:travelId/restoration/:idComp", needsAuthToken, catchErrors(createRest));
router.post("/travel/:travelId/transportation/:idComp", needsAuthToken, catchErrors(createTransp));
router.post("/travel/:travelId/plan/:idComp", needsAuthToken, catchErrors(createPlan));

router.put("/:_id", needsAuthToken, catchErrors(updateComment));
router.get("/", needsAuthToken, catchErrors(getAll));
router.delete("/:_id", needsAuthToken, catchErrors(deleteOne));
router.get("/travel/:idTravel", needsAuthToken, catchErrors(getCommentsByTravel))
router.get("/component/:idComp", needsAuthToken, catchErrors(getCommentsByComponent))
router.get("/travel/:idTravel/component/:idComp", needsAuthToken, catchErrors(getCommentsByTravAndComp))

module.exports = router;