const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const { needsAuthToken } = require("../users/auth/auth.middleware");

const Score = require("./score.service");
const Accomodation = require("../components/accommodation/accommodation.service");
const User = require("../users/user.service")

const create = async(req,res)=>{
    const compId = req.params._id;
    const { email, _id, username } = req.userInfo;
    const { value } = req.body;
    console.log(compId);
    console.log(value );

    const score = await Score.createOne(value,compId,_id);
    console.log(score)

    const accommodation = await Accomodation.findOneById(compId);
    console.log(accommodation)

    const user = await User.findById(_id);   

    accommodation.scores.push(score);
    await accommodation.save();

    user.scores.push(score);
    await user.save();
    console.log(user);

    res.status(200).json({ status: `User: ${username} added Score ${score._id} to resource: ${compId}` });
   
}

const getAll = async(req,res) =>{
    const docs = await Score.findAll();
    console.log(docs)
    res.status(200).json({ results: [docs] });
}

const router = express.Router();

router.post("/:_id",needsAuthToken, catchErrors(create));
router.get("/getAll", catchErrors(getAll));

module.exports = router;