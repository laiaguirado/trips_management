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
  res.status(201).json({ status: `User created` });
};

const login = async (req, res) => {
  const loginData = req.body;
  const token = await User.authenticateUser(loginData);
  res.status(200).json(token);
};

const getAllUsers = async (req, res) => {
  const docs = await User.findAllUsers();
  res.status(200).json(docs);
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

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  res.status(200).json(await User.findByEmail(email));
};

const getUserMe = async (req, res) => {
  const { _id } = req.userInfo;
  const { email, username } = await User.findById(_id);
  res.status(200).json({ _id, email, username });
};

const router = express.Router();

router.post("/register", catchErrors(register));
router.post("/login", catchErrors(login));
router.get("/", needsAuthToken, catchErrors(getAllUsers));
router.get("/me/travel", needsAuthToken, catchErrors(getTravelsByUser));
router.get("/me", needsAuthToken, catchErrors(getUserMe));
if (config.isDevelopment) {
  router.get("/test", needsAuthToken, catchErrors(test));
}
router.get("/:email", needsAuthToken, catchErrors(getUserByEmail));

module.exports = router;
