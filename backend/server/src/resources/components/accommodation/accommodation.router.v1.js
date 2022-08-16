const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../../errors");
const { needsAuthToken } = require("../../users/auth/auth.middleware");

const Accommodation = require("./accommodation.service");
const Travel = require("../../travel/travel.service");
const User = require("../../users/user.service");
const { runTransaction } = require("../../../helper");

const create = async (req, res) => {
  const accommData = req.body;
  const { email, _id, username } = req.userInfo;
  const { idTravel } = req.params;

  const accommodation = await runTransaction(async () => {
    const accommodationCreated = await Accommodation.createAccommodation(
      accommData,
      idTravel,
      _id
    );

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
  const { idTravel } = req.params;
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
  const { web, description, location, startDate, endDate, phone, email } =
    req.body;
  const { _id } = req.params;

  res.status(200).json(
    await Accommodation.updateAccomodation({
      _id,
      web,
      description,
      location,
      startDate,
      endDate,
      phone,
      email,
    })
  );
};

const router = express.Router();

router.post("/:idTravel", needsAuthToken, catchErrors(create));
router.get("/", needsAuthToken, catchErrors(geAllAccommodations));
router.get(
  "/travel/:idTravel",
  needsAuthToken,
  catchErrors(getAccommodationByTravel)
);
router.get("/:id", needsAuthToken, catchErrors(getAccommodationById));
router.delete("/:_id", needsAuthToken, catchErrors(deleteAccommodation));
router.put("/:_id", needsAuthToken, catchErrors(updateAccomm));

module.exports = router;
