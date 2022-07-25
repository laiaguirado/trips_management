const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../../errors");

const Accommodation = require("./accommodation.service")


  const create = async (req, res) => {
    const accommData = req.body;
    await Accommodation.createAccommodation(accommData);
    res.status(200).json({ status: `Accomm created` });
  };

  
  const router = express.Router();
  
  router.post("/create", catchErrors(create));
  
  module.exports = router;