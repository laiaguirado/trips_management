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
  const geAllAccommodations = async (req, res) => {
    const docs = await Accommodation.findAll();
    res.status(200).json({ results: [docs] });
  };

  const getAccommodationByTravel = async(req, res) =>{
    const {idTravel} = req.body;
    const doc = await Accommodation.findByTravelId(idTravel);
    res.status(200).json({ results: [doc] });
  }

  const getAccommodationById = async(req, res) =>{
    const {id} = req.body;
    const doc = await Accommodation.findOneById(id);
    res.status(200).json({ results: [doc] });
  }
  
  const router = express.Router();
  
  router.post("/create", catchErrors(create));
  router.get("/getAll", catchErrors(geAllAccommodations));
  router.get("/getByTravelId", catchErrors(getAccommodationByTravel));
  router.get("/getById", catchErrors(getAccommodationById));


  module.exports = router;