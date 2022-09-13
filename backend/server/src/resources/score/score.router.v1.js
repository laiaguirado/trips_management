const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const { needsAuthToken } = require("../users/auth/auth.middleware");

const Score = require("./score.service");
const Accommodation = require("../components/accommodation/accommodation.service");
const Restaurant = require("../components/restaurant/restaurant.service");
const Transport = require("../components/transport/transport.service");
const Plan = require("../components/plans/plans.services");
const User = require("../users/user.service");

const createAcom = async (req, res) => {
  const { compId } = req.params;
  const { _idTravel } = req.params;
  const { email, _id, username } = req.userInfo;
  const { value } = req.body;

  const score = await Score.createOne(value, compId, _id, _idTravel);

  const accommodation = await Accommodation.findOneById(compId);
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

  const transport = await Transport.findOneById(compId);
  transport.scores.push(score);
  await transport.save();

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
  "/travel/:_idTravel/transport/:compId",
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
