const express = require("express");
const {
  catchErrors,
  TripManagementApiError,
  errMalformed,
} = require("../../../errors");
const config = require("../../../config");
const { needsAuthToken } = require("../../users/auth/auth.middleware");

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res
    .status(200)
    .json({ api: "transportation", ok: true, email, id: _id, username });
};

const router = express.Router();

if (config.isDevelopment) {
  router.get("/test", needsAuthToken, catchErrors(test));
}

module.exports = router;
