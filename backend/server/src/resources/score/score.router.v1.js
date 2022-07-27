const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");

const Score = require("./score.service");
const Accomodation = require("../components/accommodation/accommodation.service");
const User = require("../users/user.service")

const create = async(req,res)=>{
    const compId = req.params.id
    const { value } = req.body;
    const {user_id} = req.body;
    console.log(compId);
    console.log(value );

    const score = await Score.createOne(value,compId,user_id);

    const accommodation = await Accomodation.findOneById(compId);

    const user = await User.findById(user_id);   

    accommodation.scores.push(score);
    await accommodation.save();

    user.scores.push(score);
    await user.save();
    console.log(user);

    res.status(200).json({ status: `User: ${user_id} added Score ${score._id} to resource: ${compId}` });
   
}

const getAll = async(req,res) =>{
    const docs = await Score.findAll();
    console.log(docs)
    res.status(200).json({ results: [docs] });
}

const router = express.Router();

router.post("/create/:id", catchErrors(create));
router.get("/getAll", catchErrors(getAll));

module.exports = router;