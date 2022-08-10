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

    const score = await Score.createOne(value,compId,_id,_idTravel);

    const accommodation = await Accomodation.findOneById(compId);

    const travel = await Travel.findTravel(_idTravel);

    const user = await User.findById(_id); 

    travel.scores.push(score);
    await travel.save();
    

    accommodation.scores.push(score);
    await accommodation.save();

    user.scores.push(score);
    await user.save();

    res.status(200).json(score);
   
}

const getAll = async(req,res) =>{
    const docs = await Score.findAll();
    console.log(docs)
    res.status(200).json({ results: [docs] });
}

const deleteOne = async (req, res) => {
    const { _id } = req.params;
    res.status(200).json(await Score.deleteScore(_id));
  };

  const findByTravel = async(req,res)=>{
    const {idTravel} = req.params;
    res.status(200).json({results: await Score.findByTravelId(idTravel)})

  }

  const getScoreByComponent = async(req, res) =>{
    const {idComp} = req.params;
    const doc = await Score.findByCompId(idComp);
    res.status(200).json({ results: doc });
  }

const router = express.Router();

router.post("/scoreTravel/:_idTravel/score/:compId",needsAuthToken, catchErrors(create));
router.get("/", catchErrors(getAll));
router.delete("/:_id",needsAuthToken,catchErrors(deleteOne));
router.get("/travel/:idTravel",needsAuthToken,catchErrors(findByTravel))
router.get("/component/:idComp",needsAuthToken,catchErrors(getScoreByComponent))


module.exports = router;