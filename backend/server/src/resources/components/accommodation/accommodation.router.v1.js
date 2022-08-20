const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../../errors");
const { needsAuthToken } = require("../../users/auth/auth.middleware");

const Accommodation = require("./accommodation.service");
const Travel = require("../../travel/travel.service");
const User = require("../../users/user.service");
const { runTransaction } = require("../../../helper");

const RESOURCETYPE = "Accommodation";

const create = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  const { idTravel } = req.paramsParentRouter;
  const accom = req.body;
  accom.resourceType = RESOURCETYPE;
  accom.idTravel = idTravel;
  accom.idUser = _id;

  const accommodation = await runTransaction(async () => {
    const accommodationCreated = await Accommodation.createAccommodation(accom);

    const travel = await Travel.findTravel(idTravel);

    travel.accommodations.push(accommodationCreated);
    await travel.save();
    return accommodationCreated;
  });
  res.status(201).json(accommodation);
};

const geAllAccommodations = async (req, res) => {
  res.status(200).json(await Accommodation.findAll());
};

const getAccommodationByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  res.status(200).json(await Accommodation.findByTravelId(idTravel));
};

const getAccommodationById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await Accommodation.findOneById(id));
};

const deleteAccommodation = async (req, res) => {
  const { _id } = req.params;
  res.status(200).json(await Accommodation.deleteAccom(_id));
};

const updateAccomm = async (req, res) => {
  const data = req.body;
  const { _id } = req.params;

  res.status(200).json(await Accommodation.updateAccomodation(_id, data));
};

const routerAccommodationByTravel = express.Router();
const routerAccommodationByAccommodation = express.Router();

const router = express.Router();

routerAccommodationByTravel.post("/", needsAuthToken, catchErrors(create));
routerAccommodationByAccommodation.get("/", needsAuthToken, catchErrors(geAllAccommodations));
routerAccommodationByTravel.get("/", needsAuthToken, catchErrors(getAccommodationByTravel));
routerAccommodationByAccommodation.get("/:id", needsAuthToken, catchErrors(getAccommodationById));
routerAccommodationByAccommodation.delete("/:_id", needsAuthToken, catchErrors(deleteAccommodation));
routerAccommodationByAccommodation.put("/:_id", needsAuthToken, catchErrors(updateAccomm));

module.exports = { routerAccommodationByTravel, routerAccommodationByAccommodation };
