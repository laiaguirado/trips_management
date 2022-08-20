const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../../errors");
const { needsAuthToken } = require("../../users/auth/auth.middleware");
const { runTransaction } = require("../../../helper");

const RESOURCETYPE = "Restoration";

const Restoration = require("./restoration.service");
const Travel = require("../../travel/travel.service");
const User = require("../../users/user.service");

const create = async (req, res) => {
  const data = req.body;
  const { email, _id, username } = req.userInfo;
  const { idTravel } = req.paramsParentRouter;
  data.resourceType = RESOURCETYPE;

  const restoration = await runTransaction(async () => {
    const restorationCreated = await Restoration.createOne(data, _id, idTravel);

    const travel = await Travel.findTravel(idTravel);
    travel.restaurants.push(restorationCreated);
    await travel.save();
    return restorationCreated;
  });
  res.status(201).json(restoration);
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
  res.status(200).json(await Restoration.getOne(_id));
};

const getByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  res.status(200).json(await Restoration.getByTravelId(idTravel));
};

const updateRest = async (req, res) => {
  const {
    web,
    description,
    location,
    phone,
    email,
    kindOfFood,
    minPrice,
    maxPrice,
  } = req.body;
  const { _id } = req.params;

  res.status(200).json(
    await Restoration.updateRestoration({
      _id,
      web,
      description,
      location,
      phone,
      email,
      kindOfFood,
      minPrice,
      maxPrice,
    })
  );
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
