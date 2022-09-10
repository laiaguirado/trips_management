const express = require("express");
const {
  catchErrors,
  TripManagementApiError,
  errMalformed,
} = require("../../../errors");
const config = require("../../../config");
const { needsAuthToken } = require("../../users/auth/auth.middleware");
const Transportation = require("./transportation.service");
const Scores = require("../../score/score.service");
const { TYPE_RESOURCE } = require("../component.service.js");
const RESOURCETYPE = TYPE_RESOURCE.TRANSPORT;

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res
    .status(200)
    .json({ api: "transportation", ok: true, email, id: _id, username });
};

const addNewScoreToTransporation = async (score, idPlan, idUser, idTravel) => {
  const scoreCreated = await Scores.createOne(score, idPlan, idUser, idTravel);
  const transportationUpdated = await Transportation.addFirstScore(
    idPlan,
    scoreCreated._id,
    score
  );
  return transportationUpdated;
};

const updateScoreToTransportation = async (score, idTransportation, idUser) => {
  const scoreUpdated = await Scores.updateScore(score._id, {
    score: score.score,
  });
  const transportationUpdated = await Transportation.getTransportationById(
    idTransportation,
    idUser,
    "totalScore"
  );

  return transportationUpdated;
};

const createTransport = async (req, res) => {
  const { _id: idUser } = req.userInfo;
  const { idTravel } = req.paramsParentRouter;
  const transportationInfo = req.body;
  const scoreUser = transportationInfo.score ? transportationInfo.score : null;

  delete transportationInfo.score;
  transportationInfo.idUser = idUser;
  transportationInfo.idTravel = idTravel;
  transportationInfo.resourceType = RESOURCETYPE;

  const transportationCreated = await Transportation.createTransport(
    transportationInfo
  );

  if (scoreUser) {
    res
      .status(201)
      .json(
        await addNewScoreToTransporation(
          scoreUser,
          transportationCreated._id,
          idUser,
          idTravel
        )
      );
  } else {
    res.status(201).json(transportationCreated);
  }
};

const getAllTransportationByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  const include = req.query._include;
  res
    .status(200)
    .json(await Transportation.getAllTransportationByTravel(idTravel, include));
};

const getTransportationById = async (req, res) => {
  const { _id: idTransportation } = req.params;
  const { _id: idUser } = req.userInfo;
  const include = req.query._include;
  res
    .status(200)
    .json(
      await Transportation.getTransportationById(
        idTransportation,
        idUser,
        include
      )
    );
};

const deleteTransportation = async (req, res) => {
  const { _id: idTransport } = req.params;

  res.status(200).json(await Transportation.deleteTransportation(idTransport));
};

const updateTransportation = async (req, res) => {
  const transportationInfo = req.body;
  const { _id: idTransport } = req.params;
  const { _id: idUser } = req.userInfo;
  const scoreUser = transportationInfo.score ? transportationInfo.score : null;

  delete transportationInfo.score;
  const transportUpdated = await Transportation.updateTransportation(
    idTransport,
    transportationInfo
  );
  if (scoreUser) {
    res
      .status(201)
      .json(await updateScoreToTransportation(scoreUser, idTransport, idUser));
  } else {
    res
      .status(201)
      .json(
        await await Transportation.getTransportationById(
          idTransport,
          idUser,
          "totalScore"
        )
      );
  }
};

const routerByTravel = express.Router();
const routerByTransportation = express.Router();

routerByTravel.post("/", needsAuthToken, catchErrors(createTransport));
routerByTravel.get(
  "/",
  needsAuthToken,
  catchErrors(getAllTransportationByTravel)
);

if (config.isDevelopment) {
  routerByTransportation.get("/test", needsAuthToken, catchErrors(test));
}

routerByTransportation.get(
  "/:_id",
  needsAuthToken,
  catchErrors(getTransportationById)
);

routerByTransportation.delete(
  "/:_id",
  needsAuthToken,
  catchErrors(deleteTransportation)
);
routerByTransportation.put(
  "/:_id",
  needsAuthToken,
  catchErrors(updateTransportation)
);

module.exports = { routerByTravel, routerByTransportation };
