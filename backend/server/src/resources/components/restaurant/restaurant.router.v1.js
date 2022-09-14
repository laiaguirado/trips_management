const express = require("express");
const { catchErrors } = require("../../../errors");
const { needsAuthToken } = require("../../users/auth/auth.middleware");
const { runTransaction } = require("../../../helper");
const Scores = require("../../score/score.service");
const { componentAllowedAction } = require("../component.middelware");
const { TYPE_RESOURCE } = require("../component.service.js");
const RESOURCETYPE = TYPE_RESOURCE.RESTAURANT;

const Restaurant = require("./restaurant.service");
const Travel = require("../../travel/travel.service");

const addNewScoreToRestaurant = async (
  score,
  idRestaurant,
  idUser,
  idTravel
) => {
  const scoreCreated = await Scores.createOne(
    score,
    idRestaurant,
    idUser,
    idTravel
  );
  const componentCreated = await Restaurant.addFirstScore(
    idRestaurant,
    scoreCreated._id,
    score
  );
  return componentCreated;
};

const updateScoreToRestaurant = async (score, idRestaurant, idUser) => {
  const scoreUpdated = await Scores.updateScore(score._id, {
    score: score.score,
  });
  const componentUpdated = await Restaurant.getOne(
    idRestaurant,
    idUser,
    "totalScore"
  );
  return componentUpdated;
};

const create = async (req, res) => {
  const data = req.body;
  const { email, _id, username } = req.userInfo;
  const { idTravel } = req.paramsParentRouter;
  const scoreUser = data.score ? data.score : null;

  delete data.score;
  data.resourceType = RESOURCETYPE;
  data.idUser = _id;
  data.idTravel = idTravel;

  const restaurant = await runTransaction(async () => {
    const restaurantCreated = await Restaurant.createOne(data);

    const travel = await Travel.findTravel(idTravel);
    travel.restaurants.push(restaurantCreated);
    await travel.save();
    return restaurantCreated;
  });

  if (scoreUser) {
    res
      .status(201)
      .json(
        await addNewScoreToRestaurant(scoreUser, restaurant._id, _id, idTravel)
      );
  } else {
    res.status(201).json(restaurant);
  }
};

const deleteRestaurant = async (req, res) => {
  const { _id } = req.params;
  res.status(200).json(await Restaurant.deleteRest(_id));
};

const getAll = async (req, res) => {
  const docs = await Restaurant.findAll();
  res.status(200).json({ results: [docs] });
};

const getById = async (req, res) => {
  const { _id } = req.params;
  const { _id: idUser } = req.userInfo;
  const include = req.query._include;

  res.status(200).json(await Restaurant.getOne(_id, idUser, include));
};

const getByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  const include = req.query._include;

  res.status(200).json(await Restaurant.getByTravelId(idTravel, include));
};

const updateRest = async (req, res) => {
  const dataRestaurant = req.body;
  const { _id: idRestaurant } = req.params;
  const { _id: idUser } = req.userInfo;
  const scoreUser = dataRestaurant.score ? dataRestaurant.score : null;

  delete dataRestaurant.score;
  const restaurantUpdated = await Restaurant.updateRestaurant(
    idRestaurant,
    dataRestaurant
  );

  if (scoreUser) {
    res
      .status(201)
      .json(await updateScoreToRestaurant(scoreUser, idRestaurant, idUser));
  } else {
    res
      .status(201)
      .json(await await Restaurant.getOne(idRestaurant, idUser, "totalScore"));
  }
};

const routerRestaurantByTravel = express.Router();
const routerRestaurantByRestaurant = express.Router();

routerRestaurantByTravel.post(
  "/",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(create)
);
routerRestaurantByTravel.get("/", needsAuthToken, catchErrors(getByTravel));

routerRestaurantByRestaurant.delete(
  "/:_id",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(deleteRestaurant)
);
routerRestaurantByRestaurant.get("/:_id", needsAuthToken, catchErrors(getById));
routerRestaurantByRestaurant.put(
  "/:_id",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(updateRest)
);

routerRestaurantByRestaurant.get("/", needsAuthToken, catchErrors(getAll));

module.exports = {
  routerRestaurantByTravel,
  routerRestaurantByRestaurant,
};
