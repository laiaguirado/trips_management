const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../../errors");
const { needsAuthToken } = require("../../users/auth/auth.middleware");


const Restoration = require("./restoration.service")
const Travel = require("../../travel/travel.service")
const User = require("../../users/user.service")


  const create = async (req, res) => {
    const data = req.body;
    const { email, _id, username } = req.userInfo;
    const {idTravel} = req.params;

    const restoration = await Restoration.createOne(data,_id,idTravel)

    const travel = await Travel.findTravel(idTravel);

    const user = await User.findById(_id); 

    travel.restaurants.push(restoration);
    await travel.save();

    user.restaurants.push(restoration);
    await user.save();

    res.status(200).json(restoration);

  };

  const deleteRestoration = async (req, res) => {
    const { _id } = req.params;
    res.status(200).json(await Restoration.deleteRest(_id));
  };

  const getAll = async(req,res)=>{
    const docs = await Restoration.findAll();
    res.status(200).json({results:[docs]})
  }

  const getById = async(req,res)=>{
    const {_id} = req.params;
    res.status(200).json(await Restoration.getOne(_id))
  }

  const getByTravel = async(req,res)=>{
    const {idTravel} = req.params;
    res.status(200).json(await Restoration.getByTravelId(idTravel));
  }

  const updateRest= async (req, res) => {
    const { web, description, location, phone, email, kindOfFood, minPrice, maxPrice } = req.body;
    const { _id } = req.params;
  
    res.status(200).json(
      await Restoration.updateRestoration({
        _id,
        web,
        description,
        location,
        phone,
        email,
        kindOfFood,
        minPrice,
        maxPrice
      })
    );
  };

  const router = express.Router();
  router.post("/:idTravel",needsAuthToken, catchErrors(create));
  router.delete("/:_id",needsAuthToken,catchErrors(deleteRestoration));
  router.get("/",needsAuthToken,catchErrors(getAll));
  router.get("/:_id",needsAuthToken,catchErrors(getById));
  router.get("/travel/:idTravel",needsAuthToken,catchErrors(getByTravel));
  router.put("/:_id",needsAuthToken,catchErrors(updateRest));
  module.exports = router;