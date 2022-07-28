const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const config = require("../../config");
const { needsAuthToken } = require("../users/auth/auth.middleware");
const Travel = require("./travel.service");

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res.status(200).json({ api: "travel", ok: true, email, id: _id, username });
};

const getAllTravel = async (req, res) => {
  res.status(200).json(await Travel.getAllTravel());
};

const getTravelByUser = async (req, res) => {
  const { _id } = req.userInfo;
  res.status(200).json(await Travel.getTravelByUser(_id));
};

const createTravel = async (req, res) => {
  const dataTravel = req.body;
  res.status(200).json(await Travel.createTravel(dataTravel));
};

const updateTravel = async (req, res) => {
  const { name, description, location, startDate, endDate } = req.body;
  const { _id } = req.params;

  res.status(200).json(
    await Travel.updateTravel({
      _id,
      name,
      description,
      location,
      startDate,
      endDate,
    })
  );
};

const deleteTravel = async (req, res) => {
  const { _id } = req.params;
  res.status(200).json(await Travel.deleteTravel(_id));
};

const addUserToTravel = async (req, res) => {
  const { idTravel, idUser } = req.params;
  const travel = await Travel.addUserToTravel(idTravel, idUser);
  // console.log(travel);
  res.status(200).json(travel);
};

const router = express.Router();

router.get("/me", needsAuthToken, catchErrors(getTravelByUser));
router.get("/", needsAuthToken, catchErrors(getAllTravel));
router.post("/", needsAuthToken, catchErrors(createTravel));
router.post(
  "/:idTravel/traveller/:idUser",
  needsAuthToken,
  catchErrors(addUserToTravel)
);
router.put("/:_id", needsAuthToken, catchErrors(updateTravel));
router.delete("/:_id", needsAuthToken, catchErrors(deleteTravel));

if (config.isDevelopment) {
  router.get("/test", needsAuthToken, catchErrors(test));
}

module.exports = router;
