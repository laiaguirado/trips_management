const express = require("express");
const {
  catchErrors,
  TripManagementApiError,
  errMalformed,
} = require("../../../errors");
const config = require("../../../config");
const { needsAuthToken } = require("../../users/auth/auth.middleware");
const Transportation = require("./transportation.service");
const RESOURCETYPE = "Transportation";

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res
    .status(200)
    .json({ api: "transportation", ok: true, email, id: _id, username });
};

const createTransport = async (req, res) => {
  const { _id } = req.userInfo;
  const { idTravel } = req.paramsParentRouter;

  const transportationInfo = req.body;
  transportationInfo.idUser = _id;
  transportationInfo.idTravel = idTravel;
  transportationInfo.resourceType = RESOURCETYPE;

  res
    .status(201)
    .json(await Transportation.createTransport(transportationInfo));
};

const getAllTransportationByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  res
    .status(200)
    .json(await Transportation.getAllTransportationByTravel(idTravel));
};

const getTransportationById = async (req, res) => {
  const { idTransportation } = req.params;

  res
    .status(200)
    .json(await Transportation.getTransportationById(idTransportation));
};

const deleteTransportation = async (req, res) => {
  const { idTransportation } = req.params;

  res
    .status(200)
    .json(await Transportation.deleteTransportation(idTransportation));
};

const updateTransportation = async (req, res) => {
  const transportationInfo = req.body;
  const { idTransportation } = req.params;

  res
    .status(200)
    .json(
      await Transportation.updateTransportation(
        idTransportation,
        transportationInfo
      )
    );
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
  "/:idTransportation",
  needsAuthToken,
  catchErrors(getTransportationById)
);

routerByTransportation.delete(
  "/:idTransportation",
  needsAuthToken,
  catchErrors(deleteTransportation)
);
routerByTransportation.put(
  "/:idTransportation",
  needsAuthToken,
  catchErrors(updateTransportation)
);

module.exports = { routerByTravel, routerByTransportation };
