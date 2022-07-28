const express = require("express");
const {
  catchErrors,
  TripManagementApiError,
  errMalformed,
} = require("../../errors");
const config = require("../../config");
const { needsAuthToken } = require("./auth/auth.middleware");
const User = require("./user.service");

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res.status(200).json({ ok: true, email, id: _id, username });
};

const register = async (req, res) => {
  const userData = req.body;
  await User.createUser(userData);
  res.status(200).json({ status: `User created` });
};

const login = async (req, res) => {
  const loginData = req.body;
  const token = await User.authenticateUser(loginData);
  res.status(200).json(token);
};

const getAll = async (req, res) => {
  const docs = await User.findAll();
  res.status(200).json({ results: [docs] });
};

const getTravelsByUser = async (req, res) => {
  const { _id } = req.userInfo;
  const userinfo = await User.findById(_id);
  if (userinfo) {
    res.status(200).json(userinfo.travels);
  } else {
    errMalformed("User doesn't exists");
  }
};

const router = express.Router();

router.post("/register", catchErrors(register));
router.post("/login", catchErrors(login));
router.get("/getAll", needsAuthToken, catchErrors(getAll));
router.get("/me/travel", needsAuthToken, catchErrors(getTravelsByUser));
if (config.isDevelopment) {
  router.get("/test", needsAuthToken, catchErrors(test));
}

module.exports = router;
