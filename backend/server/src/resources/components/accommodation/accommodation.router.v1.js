const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../../errors");
const { needsAuthToken } = require("../../users/auth/auth.middleware");
const Scores = require("../../score/score.service");
const Accommodation = require("./accommodation.service");
const Travel = require("../../travel/travel.service");
const User = require("../../users/user.service");
const { runTransaction } = require("../../../helper");
const { componentAllowedAction } = require("../component.middelware");

const { TYPE_RESOURCE } = require("../component.service.js");

const RESOURCETYPE = TYPE_RESOURCE.ACCOMMODATION;

const addNewScoreToAccommodation = async (
  score,
  idAccommodation,
  idUser,
  idTravel
) => {
  //Si el plan te un score, cal guardar la info i retornar-la
  const scoreCreated = await Scores.createOne(
    score,
    idAccommodation,
    idUser,
    idTravel
  );
  const accommodationUpdated = await Accommodation.addFirstScore(
    idAccommodation,
    scoreCreated._id,
    score
  );
  return accommodationUpdated;
};

const updateScoreToAccommodation = async (score, idAccommodation, idUser) => {
  const scoreUpdated = await Scores.updateScore(score._id, {
    score: score.score,
  });
  const accommodationUpdated = await Accommodation.findAccommodationById(
    idAccommodation,
    idUser,
    "totalScore"
  );
  return accommodationUpdated;
};

const create = async (req, res) => {
  const { email, _id: idUser, username } = req.userInfo;
  const { idTravel } = req.paramsParentRouter;
  const accom = req.body;
  const scoreUser = accom.score ? accom.score : null;

  delete accom.score;
  accom.resourceType = RESOURCETYPE;
  accom.idTravel = idTravel;
  accom.idUser = idUser;

  const accommodation = await runTransaction(async () => {
    const accommodationCreated = await Accommodation.createAccommodation(accom);

    const travel = await Travel.findTravel(idTravel);

    travel.accommodations.push(accommodationCreated);
    await travel.save();
    return accommodationCreated;
  });

  if (scoreUser) {
    res
      .status(201)
      .json(
        await addNewScoreToAccommodation(
          scoreUser,
          accommodation._id,
          idUser,
          idTravel
        )
      );
  } else {
    res.status(201).json(accommodation);
  }
};

const geAllAccommodations = async (req, res) => {
  res.status(200).json(await Accommodation.findAll());
};

const getAccommodationByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  const include = req.query._include;

  res.status(200).json(await Accommodation.findByTravelId(idTravel, include));
};

const getAccommodationById = async (req, res) => {
  const { id } = req.params;
  const include = req.query._include;
  const { _id: idUser } = req.userInfo;

  res
    .status(200)
    .json(await Accommodation.findAccommodationById(id, idUser, include));
};

const deleteAccommodation = async (req, res) => {
  const { _id } = req.params;
  res.status(200).json(await Accommodation.deleteAccom(_id));
};

const updateAccomm = async (req, res) => {
  const data = req.body;
  const { _id } = req.params;
  const { _id: idUser } = req.userInfo;
  const scoreUser = data.score ? data.score : null;

  delete data.score;
  const accommodationUpdated = await Accommodation.updateAccomodation(
    _id,
    data
  );

  if (scoreUser) {
    res
      .status(201)
      .json(await updateScoreToAccommodation(scoreUser, _id, idUser));
  } else {
    res
      .status(201)
      .json(
        await await Accommodation.findAccommodationById(
          _id,
          idUser,
          "totalScore"
        )
      );
  }
};

const routerAccommodationByTravel = express.Router();
const routerAccommodationByAccommodation = express.Router();

const router = express.Router();

routerAccommodationByTravel.post(
  "/",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(create)
);
routerAccommodationByAccommodation.get("/", needsAuthToken, catchErrors(geAllAccommodations));
routerAccommodationByTravel.get("/", needsAuthToken, catchErrors(getAccommodationByTravel));
routerAccommodationByAccommodation.get("/:id", needsAuthToken, catchErrors(getAccommodationById));
routerAccommodationByAccommodation.delete(
  "/:_id",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(deleteAccommodation)
);
routerAccommodationByAccommodation.put(
  "/:_id",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(updateAccomm)
);

module.exports = { routerAccommodationByTravel, routerAccommodationByAccommodation };
