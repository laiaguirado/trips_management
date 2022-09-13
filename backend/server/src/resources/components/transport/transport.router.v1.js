const express = require("express");
const { catchErrors } = require("../../../errors");
const config = require("../../../config");
const { needsAuthToken } = require("../../users/auth/auth.middleware");
const Transport = require("./transport.service");
const Scores = require("../../score/score.service");
const { TYPE_RESOURCE } = require("../component.service.js");
const { componentAllowedAction } = require("../component.middelware");

const RESOURCETYPE = TYPE_RESOURCE.TRANSPORT;

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res
    .status(200)
    .json({ api: "transport", ok: true, email, id: _id, username });
};

const addNewScoreToTransporation = async (score, idPlan, idUser, idTravel) => {
  const scoreCreated = await Scores.createOne(score, idPlan, idUser, idTravel);
  const transportUpdated = await Transport.addFirstScore(
    idPlan,
    scoreCreated._id,
    score
  );
  return transportUpdated;
};

const updateScoreToTransport = async (score, idTransport, idUser) => {
  const scoreUpdated = await Scores.updateScore(score._id, {
    score: score.score,
  });
  const transportUpdated = await Transport.getTransportById(
    idTransport,
    idUser,
    "totalScore"
  );

  return transportUpdated;
};

const createTransport = async (req, res) => {
  const { _id: idUser } = req.userInfo;
  const { idTravel } = req.paramsParentRouter;
  const transportInfo = req.body;
  const scoreUser = transportInfo.score ? transportInfo.score : null;

  delete transportInfo.score;
  transportInfo.idUser = idUser;
  transportInfo.idTravel = idTravel;
  transportInfo.resourceType = RESOURCETYPE;

  const transportCreated = await Transport.createTransport(transportInfo);

  if (scoreUser) {
    res
      .status(201)
      .json(
        await addNewScoreToTransporation(
          scoreUser,
          transportCreated._id,
          idUser,
          idTravel
        )
      );
  } else {
    res.status(201).json(transportCreated);
  }
};

const getAllTransportByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  const include = req.query._include;
  res
    .status(200)
    .json(await Transport.getAllTransportByTravel(idTravel, include));
};

const getTransportById = async (req, res) => {
  const { _id: idTransport } = req.params;
  const { _id: idUser } = req.userInfo;
  const include = req.query._include;
  res
    .status(200)
    .json(await Transport.getTransportById(idTransport, idUser, include));
};

const deleteTransport = async (req, res) => {
  const { _id: idTransport } = req.params;

  res.status(200).json(await Transport.deleteTransport(idTransport));
};

const updateTransport = async (req, res) => {
  const transportInfo = req.body;
  const { _id: idTransport } = req.params;
  const { _id: idUser } = req.userInfo;
  const scoreUser = transportInfo.score ? transportInfo.score : null;

  delete transportInfo.score;
  const transportUpdated = await Transport.updateTransport(
    idTransport,
    transportInfo
  );
  if (scoreUser) {
    res
      .status(201)
      .json(await updateScoreToTransport(scoreUser, idTransport, idUser));
  } else {
    res
      .status(201)
      .json(
        await await Transport.getTransportById(
          idTransport,
          idUser,
          "totalScore"
        )
      );
  }
};

const routerByTravel = express.Router();
const routerByTransport = express.Router();

routerByTravel.post(
  "/",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(createTransport)
);
routerByTravel.get("/", needsAuthToken, catchErrors(getAllTransportByTravel));

if (config.isDevelopment) {
  routerByTransport.get("/test", needsAuthToken, catchErrors(test));
}

routerByTransport.get("/:_id", needsAuthToken, catchErrors(getTransportById));

routerByTransport.delete(
  "/:_id",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(deleteTransport)
);
routerByTransport.put(
  "/:_id",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(updateTransport)
);

module.exports = { routerByTravel, routerByTransport };
