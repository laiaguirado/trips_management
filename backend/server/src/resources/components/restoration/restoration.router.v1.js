const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../../errors");
const { needsAuthToken } = require("../../users/auth/auth.middleware");
const { runTransaction } = require("../../../helper");
const Scores = require("../../score/score.service");

const RESOURCETYPE = "Restoration";

const Restoration = require("./restoration.service");
const Travel = require("../../travel/travel.service");
const User = require("../../users/user.service");

const addNewScoreToRestoration = async (
  score,
  idRestoration,
  idUser,
  idTravel
) => {
  //Si el plan te un score, cal guardar la info i retornar-la
  const scoreCreated = await Scores.createOne(
    score,
    idRestoration,
    idUser,
    idTravel
  );
  const planCreated = await Restoration.addFirstScore(
    idRestoration,
    scoreCreated._id,
    score
  );
  return planCreated;
};

const updateScoreToRestoration = async (score, idRestoration, idUser) => {
  const scoreUpdated = await Scores.updateScore(score._id, {
    score: score.score,
  });
  const restorationUpdated = await Restoration.getOne(
    idRestoration,
    idUser,
    "totalScore"
  );
  return restorationUpdated;
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

  const restoration = await runTransaction(async () => {
    const restorationCreated = await Restoration.createOne(data);

    const travel = await Travel.findTravel(idTravel);
    travel.restaurants.push(restorationCreated);
    await travel.save();
    return restorationCreated;
  });

  if (scoreUser) {
    res
      .status(201)
      .json(
        await addNewScoreToRestoration(
          scoreUser,
          restoration._id,
          _id,
          idTravel
        )
      );
  } else {
    res.status(201).json(restoration);
  }
};

const deleteRestoration = async (req, res) => {
  const { _id } = req.params;
  res.status(200).json(await Restoration.deleteRest(_id));
};

const getAll = async (req, res) => {
  const docs = await Restoration.findAll();
  res.status(200).json({ results: [docs] });
};

const getById = async (req, res) => {
  const { _id } = req.params;
  const { _id: idUser } = req.userInfo;
  const include = req.query._include;

  res.status(200).json(await Restoration.getOne(_id, idUser, include));
};

const getByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  const include = req.query._include;

  res.status(200).json(await Restoration.getByTravelId(idTravel, include));
};

const updateRest = async (req, res) => {
  const dataRestoration = req.body;
  const { _id: idRestoration } = req.params;
  const { _id: idUser } = req.userInfo;
  const scoreUser = dataRestoration.score ? dataRestoration.score : null;

  delete dataRestoration.score;
  const restorationUpdated = await Restoration.updateRestoration(
    idRestoration,
    dataRestoration
  );

  if (scoreUser) {
    res
      .status(201)
      .json(await updateScoreToRestoration(scoreUser, idRestoration, idUser));
  } else {
    res
      .status(201)
      .json(
        await await Restoration.getOne(idRestoration, idUser, "totalScore")
      );
  }
};

//const router = express.Router();

const routerRestorationByTravel = express.Router();
const routerRestorationByResporation = express.Router();

routerRestorationByTravel.post("/", needsAuthToken, catchErrors(create));
routerRestorationByTravel.get("/", needsAuthToken, catchErrors(getByTravel));

routerRestorationByResporation.delete(
  "/:_id",
  needsAuthToken,
  catchErrors(deleteRestoration)
);
routerRestorationByResporation.get(
  "/:_id",
  needsAuthToken,
  catchErrors(getById)
);
routerRestorationByResporation.put(
  "/:_id",
  needsAuthToken,
  catchErrors(updateRest)
);

routerRestorationByResporation.get("/", needsAuthToken, catchErrors(getAll));

module.exports = {
  routerRestorationByTravel,
  routerRestorationByResporation,
};
