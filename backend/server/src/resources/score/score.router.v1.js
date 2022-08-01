const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const { needsAuthToken } = require("../users/auth/auth.middleware");

const Score = require("./score.service");
const Accomodation = require("../components/accommodation/accommodation.service");
const User = require("../users/user.service")
const Travel = require("../travel/travel.service")

const create = async(req,res)=>{
    const {compId} = req.params;
    const {_idTravel} = req.params;
    const { email, _id, username } = req.userInfo;
    const { value } = req.body;
    console.log(compId);
    console.log(value );

    const score = await Score.createOne(value,compId,_id,_idTravel);
    console.log(score)

    const accommodation = await Accomodation.findOneById(compId);
    console.log(accommodation)

    const travel = await Travel.findTravel(_idTravel);
    console.log(travel)

    const user = await User.findById(_id); 
      console.log(user)

    travel.scores.push(score);
    await travel.save();
    

    accommodation.scores.push(score);
    await accommodation.save();

    user.scores.push(score);
    await user.save();
    console.log(user);

    res.status(200).json({ status: `User: ${username} added Score ${score._id} to resource: ${compId} in the travel ${travel.name}` });
   
}

const getAll = async(req,res) =>{
    const docs = await Score.findAll();
    console.log(docs)
    res.status(200).json({ results: [docs] });
}

const router = express.Router();

router.post("/scoreTravel/:_idTravel/score/:compId",needsAuthToken, catchErrors(create));
router.get("/getAll", catchErrors(getAll));

module.exports = router;