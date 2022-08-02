const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../../errors");
const { needsAuthToken } = require("../../users/auth/auth.middleware");


const Accommodation = require("./accommodation.service")
const Travel = require("../../travel/travel.service")
const User = require("../../users/user.service")

  const create = async (req, res) => {
    const accommData = req.body;
    const { email, _id, username } = req.userInfo;
    const {idTravel} = req.params;

    const accommodation = await Accommodation.createAccommodation(accommData,_id,idTravel)

    const travel = await Travel.findTravel(idTravel);

    const user = await User.findById(_id); 

    travel.accommodations.push(accommodation);
    await travel.save();

    user.accommodations.push(accommodation);
    await user.save();

    res.status(200).json(accommodation);
  };
  const geAllAccommodations = async (req, res) => {
    const docs = await Accommodation.findAll();
    res.status(200).json({ results: [docs] });
  };

  const getAccommodationByTravel = async(req, res) =>{
    const {idTravel} = req.params;
    const doc = await Accommodation.findByTravelId(idTravel);
    res.status(200).json({ results: [doc] });
  }

  const getAccommodationById = async(req, res) =>{
    const {id} = req.params;
    const doc = await Accommodation.findOneById(id);
    res.status(200).json({ results: [doc] });
  }
  
  const router = express.Router();
  
  router.post("/:idTravel",needsAuthToken, catchErrors(create));
  router.get("/getAll", catchErrors(geAllAccommodations));
  router.get("/getByTravelId/:idTravel", catchErrors(getAccommodationByTravel));
  router.get("/getById/:id", catchErrors(getAccommodationById));


  module.exports = router;