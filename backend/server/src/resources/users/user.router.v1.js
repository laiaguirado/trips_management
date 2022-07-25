const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
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

const router = express.Router();

router.post("/register", catchErrors(register));
router.post("/login", catchErrors(login));
if (config.isDevelopment) {
  router.get("/test", needsAuthToken, catchErrors(test));
}

module.exports = router;
