const express = require("express");
const {
  catchErrors,
  TripManagementApiError,
  errMalformed,
} = require("../../errors");
const config = require("../../config");
const { needsAuthToken } = require("../users/auth/auth.middleware");
const Travel = require("./travel.service");
const UserService = require("../users/user.service");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log("fileFilter");
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res.status(200).json({ api: "travel", ok: true, email, id: _id, username });
};

const getAllTravel = async (req, res) => {
  res.status(200).json(await Travel.getAllTravel());
};

const getTravelById = async (req, res) => {
  const { _id } = req.params;
  res.status(200).json(await Travel.getTravelById(_id));
};

const createTravel = async (req, res) => {
  console.log("CreateTravel");
  const dataTravel = req.body;
  console.log("CreateTravel");
  const { _id } = req.userInfo;
  dataTravel.creator = _id;
  dataTravel.image = {
    url: req.file.path,
    extension: req.file.mimetype,
    data: "NONECESITO",
  };
  console.log(dataTravel);
  const p = await Travel.createTravel(dataTravel);
  console.log(p);
  res.status(201).json(p);
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

const addMeToTravel = async (req, res) => {
  const { idTravel } = req.params;
  const { _id } = req.userInfo;
  const travel = await addIdUserToTravel(_id, idTravel);
  res.status(200).json(travel);
};

const addUserToTravel = async (req, res) => {
  const { idTravel, email } = req.params;
  const user = await UserService.findByEmail(email);
  if (user) {
    const travel = await addIdUserToTravel(user._id, idTravel);
    res.status(200).json(travel);
  } else {
    errMalformed("User doesn't exists");
  }
};

const addIdUserToTravel = async (idUser, idTravel) => {
  const travel = await Travel.addUserToTravel(idTravel, idUser);
  return travel;
};

const deleteMeToTravel = async (req, res) => {
  const { idTravel } = req.params;
  const { _id } = req.userInfo;
  const travel = await deleteUserToTravelById(idTravel, _id);
  if (travel) {
    res.status(200).json(travel);
  } else {
    errMalformed("Travel doesn't exists");
  }
};

const deleteUserToTravel = async (req, res) => {
  const { idTravel, email } = req.params;
  const user = await UserService.findByEmail(email);
  if (user) {
    const travel = await deleteUserToTravelById(idTravel, user._id);
    if (travel) {
      res.status(200).json(travel);
    } else {
      errMalformed("Travel doesn't exists");
    }
  } else {
    errMalformed("User doesn't exists");
  }
};

const deleteUserToTravelById = async (idTravel, idUser) => {
  const travel = await Travel.deleteUserToTravel(idTravel, idUser);
  return travel;
};

const router = express.Router();

if (config.isDevelopment) {
  router.get("/test", needsAuthToken, catchErrors(test));
}

router.get("/", needsAuthToken, catchErrors(getAllTravel));
router.get("/:_id", needsAuthToken, catchErrors(getTravelById));
router.post(
  "/",
  needsAuthToken,
  upload.single("profileImg"),
  catchErrors(createTravel)
);
router.post(
  "/:idTravel/traveler/me",
  needsAuthToken,
  catchErrors(addMeToTravel)
);

router.post(
  "/:idTravel/traveler/:email",
  needsAuthToken,
  catchErrors(addUserToTravel)
);

router.delete(
  "/:idTravel/traveler/me",
  needsAuthToken,
  catchErrors(deleteMeToTravel)
);

router.delete(
  "/:idTravel/traveler/:email",
  needsAuthToken,
  catchErrors(deleteUserToTravel)
);

router.put("/:_id", needsAuthToken, catchErrors(updateTravel));
router.delete("/:_id", needsAuthToken, catchErrors(deleteTravel));

module.exports = router;
