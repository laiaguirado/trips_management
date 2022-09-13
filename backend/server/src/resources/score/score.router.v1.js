const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const { needsAuthToken } = require("../users/auth/auth.middleware");

const Score = require("./score.service");
const Accomodation = require("../components/accommodation/accommodation.service");
const Restaurant = require("../components/restaurant/restaurant.service");
const Transportation = require("../components/transportation/transportation.service");
const Plan = require("../components/plans/plans.services");
const User = require("../users/user.service");
const Travel = require("../travel/travel.service");

const createAcom = async (req, res) => {
  const { compId } = req.params;
  const { _idTravel } = req.params;
  const { email, _id, username } = req.userInfo;
  const { value } = req.body;

  const score = await Score.createOne(value, compId, _id, _idTravel);

  const accommodation = await Accomodation.findOneById(compId);
  accommodation.scores.push(score);
  await accommodation.save();

  res.status(200).json(score);
};

const createRest = async (req, res) => {
  const { compId } = req.params;
  const { _idTravel } = req.params;
  const { email, _id, username } = req.userInfo;
  const { value } = req.body;

  const score = await Score.createOne(value, compId, _id, _idTravel);

  const restaurant = await Restaurant.findOneById(compId);
  restaurant.scores.push(score);
  await restaurant.save();

  res.status(200).json(score);
};

const createTransp = async (req, res) => {
  const { compId } = req.params;
  const { _idTravel } = req.params;
  const { email, _id, username } = req.userInfo;
  const { value } = req.body;

  const score = await Score.createOne(value, compId, _id, _idTravel);

  const transportation = await Transportation.findOneById(compId);
  transportation.scores.push(score);
  await transportation.save();

  res.status(200).json(score);
};

const createPlan = async (req, res) => {
  const { compId } = req.params;
  const { _idTravel } = req.params;
  const { email, _id, username } = req.userInfo;
  const { value } = req.body;

  const score = await Score.createOne(value, compId, _id, _idTravel);

  const plan = await Plan.findOneById(compId);
  plan.scores.push(score);
  await plan.save();

  res.status(200).json(score);
};

const getAll = async (req, res) => {
  res.status(200).json(await Score.findAll());
};

const deleteOne = async (req, res) => {
  const { _id } = req.params;
  res.status(200).json(await Score.deleteScore(_id));
};

const findByTravel = async (req, res) => {
  const { idTravel } = req.params;
  res.status(200).json(await Score.findByTravelId(idTravel));
};

const getScoreByComponent = async (req, res) => {
  const { idComp } = req.params;
  res.status(200).json(await Score.findByCompId(idComp));
};

const updateScore = async (req, res) => {
  const data = req.body;
  const { _id } = req.params;

  res.status(200).json(await Score.updateScore(_id, data));
};

const router = express.Router();

router.post(
  "/travel/:_idTravel/accommodation/:compId",
  needsAuthToken,
  catchErrors(createAcom)
);
router.post(
  "/travel/:_idTravel/restaurant/:compId",
  needsAuthToken,
  catchErrors(createRest)
);
router.post(
  "/travel/:_idTravel/transportation/:compId",
  needsAuthToken,
  catchErrors(createTransp)
);
router.post(
  "/travel/:_idTravel/plan/:compId",
  needsAuthToken,
  catchErrors(createPlan)
);
router.put("/:_id", needsAuthToken, catchErrors(updateScore));
router.get("/", catchErrors(getAll));
router.delete("/:_id", needsAuthToken, catchErrors(deleteOne));
router.get("/travel/:idTravel", needsAuthToken, catchErrors(findByTravel));
router.get(
  "/component/:idComp",
  needsAuthToken,
  catchErrors(getScoreByComponent)
);

module.exports = router;
