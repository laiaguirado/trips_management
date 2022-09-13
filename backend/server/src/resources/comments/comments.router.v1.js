const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const { needsAuthToken } = require("../users/auth/auth.middleware");
const { commentAllowedAction } = require("./comments.middelware");

const Comment = require("./comments.service");
const Accomodation = require("../components/accommodation/accommodation.service");
const User = require("../users/user.service");
const Travel = require("../travel/travel.service");
const Restaurant = require("../components/restaurant/restaurant.service");
const Transport = require("../components/transport/transport.service");
const Plan = require("../components/plans/plans.services");
const { TYPE_RESOURCE } = require("../components/component.service.js");

const createAcom = async (req, res) => {
  const { idComp } = req.params;
  const { email, _id, username } = req.userInfo;
  const { comment_text } = req.body;
  const { travelId } = req.params;
  const resourceType = TYPE_RESOURCE.ACCOMMODATION;

  const comment = await Comment.createOne(
    comment_text,
    idComp,
    _id,
    travelId,
    resourceType
  );
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
  const restaurant = await Restaurant.findOneById(idComp);

  restaurant.comments.push(comment);
  await restaurant.save();

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
  const transport = await Transport.findOneById(idComp);

  transport.comments.push(comment);
  await transport.save();

  res.status(200).json(comment);
};

const createPlan = async (req, res) => {
  const { idComp } = req.params;
  const { email, _id, username } = req.userInfo;
  const { comment_text } = req.body;
  const { travelId } = req.params;
  const resourceType = TYPE_RESOURCE.PLANS;

  const comment = await Comment.createOne(
    comment_text,
    idComp,
    _id,
    travelId,
    resourceType
  );
  const plan = await Plan.findOneById(idComp);

  plan.comments.push(comment);
  await plan.save();

  res.status(200).json(comment);
};

const getAll = async (req, res) => {
  res.status(200).json(await Comment.findAll());
};

const deleteOne = async (req, res) => {
  const { _id } = req.params;
  res.status(200).json(await Comment.deleteComment(_id));
};

const getCommentsByTravel = async (req, res) => {
  const { idTravel } = req.params;
  res.status(200).json(await Comment.findByTravelId(idTravel));
};

const getCommentsByComponent = async (req, res) => {
  const { idComp } = req.params;
  res.status(200).json(await Comment.findByCompId(idComp));
};

const getCommentsByTravAndComp = async (req, res) => {
  const { idComp } = req.params;
  const { idTravel } = req.params;
  res.status(200).json(await Comment.findByTravelAndComp(idTravel, idComp));
};

const updateComment = async (req, res) => {
  const data = req.body;
  const { _id } = req.params;

  res.status(200).json(await Comment.updateComm(_id, data));
};

const router = express.Router();

router.post(
  "/travel/:travelId/accommodation/:idComp",
  needsAuthToken,
  commentAllowedAction,
  catchErrors(createAcom)
);
router.post(
  "/travel/:travelId/restaurant/:idComp",
  needsAuthToken,
  commentAllowedAction,
  catchErrors(createRest)
);
router.post(
  "/travel/:travelId/transport/:idComp",
  needsAuthToken,
  commentAllowedAction,
  catchErrors(createTransp)
);
router.post(
  "/travel/:travelId/plan/:idComp",
  needsAuthToken,
  commentAllowedAction,
  catchErrors(createPlan)
);

router.put(
  "/:_id",
  needsAuthToken,
  commentAllowedAction,
  catchErrors(updateComment)
);
router.get("/", needsAuthToken, catchErrors(getAll));
router.delete(
  "/:_id",
  needsAuthToken,
  commentAllowedAction,
  catchErrors(deleteOne)
);
router.get(
  "/travel/:idTravel",
  needsAuthToken,
  catchErrors(getCommentsByTravel)
);
router.get(
  "/component/:idComp",
  needsAuthToken,
  catchErrors(getCommentsByComponent)
);
router.get(
  "/travel/:idTravel/component/:idComp",
  needsAuthToken,
  catchErrors(getCommentsByTravAndComp)
);

module.exports = router;
