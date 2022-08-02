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

  const router = express.Router();
  router.post("/:idTravel",needsAuthToken, catchErrors(create));
  
  module.exports = router;