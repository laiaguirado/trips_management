const { catchErrors, TripManagementApiError } = require("../../errors");
const config = require("../../config");
const { needsAuthToken } = require("./auth/auth.middleware");
const User = require("./user.service");

const test = async (req, res) => {
  res.status(200).json({
    status: `This version is just to show how to add API versions`,
  });
};

const newTest = async (req, res) => {
  res.status(200).json({
    status: `This version is just to show how to add API versions. This is a new funcionality in v2`,
  });
};

const register = async (req, res) => {
  res.status(200).json({
    status: `This version is just to show how to add API versions`,
  });
};

const login = async (req, res) => {
  res.status(200).json({
    status: `This version is just to show how to add API versions`,
  });
};

const express = require("express");
const router = express.Router();

router.post("/register", catchErrors(register));
router.post("/login", catchErrors(login));
if (config.isDevelopment) {
  router.get("/test", /*needsAuthToken,*/ catchErrors(test));
  router.get("/newTest", /*needsAuthToken,*/ catchErrors(newTest));
}

module.exports = router;
