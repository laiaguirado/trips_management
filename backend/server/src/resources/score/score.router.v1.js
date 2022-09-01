const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const { needsAuthToken } = require("../users/auth/auth.middleware");

const Score = require("./score.service");
const Accomodation = require("../components/accommodation/accommodation.service");
const Restoration = require("../components/restoration/restoration.service")
const Transportation = require("../components/transportation/transportation.service")
const Plan = require("../components/plans/plans.services")
const User = require("../users/user.service")
const Travel = require("../travel/travel.service")

const createAcom = async(req,res)=>{
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

const createRest = async(req,res)=>{
  const {compId} = req.params;
  const {_idTravel} = req.params;
  const { email, _id, username } = req.userInfo;
  const { value } = req.body;

  const score = await Score.createOne(value,compId,_id,_idTravel);

  const restoration = await Restoration.findOneById(compId);

  const travel = await Travel.findTravel(_idTravel);

  const user = await User.findById(_id); 

  travel.scores.push(score);
  await travel.save();
  

  restoration.scores.push(score);
  await restoration.save();

  user.scores.push(score);
  await user.save();

  res.status(200).json(score);
 
}

const createTransp = async(req,res)=>{
  const {compId} = req.params;
  const {_idTravel} = req.params;
  const { email, _id, username } = req.userInfo;
  const { value } = req.body;

  const score = await Score.createOne(value,compId,_id,_idTravel);

  const transportation = await Transportation.findOneById(compId);

  const travel = await Travel.findTravel(_idTravel);

  const user = await User.findById(_id); 

  travel.scores.push(score);
  await travel.save();
  

  transportation.scores.push(score);
  await transportation.save();

  user.scores.push(score);
  await user.save();

  res.status(200).json(score);
 
}

const createPlan = async(req,res)=>{
  const {compId} = req.params;
  const {_idTravel} = req.params;
  const { email, _id, username } = req.userInfo;
  const { value } = req.body;

  const score = await Score.createOne(value,compId,_id,_idTravel);

  const plan = await Plan.findOneById(compId);

  const travel = await Travel.findTravel(_idTravel);

  const user = await User.findById(_id); 

  travel.scores.push(score);
  await travel.save();
  

  plan.scores.push(score);
  await plan.save();

  user.scores.push(score);
  await user.save();

  res.status(200).json(score);
 
}

const getAll = async(req,res) =>{
    const docs = await Score.findAll();
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

  const updateScore= async (req, res) => {
    const data = req.body;
    const { _id } = req.params;
  
    res.status(200).json(await Score.updateScore(_id, data));
  };

const router = express.Router();

router.post("/travel/:_idTravel/accomodation/:compId",needsAuthToken, catchErrors(createAcom));
router.post("/travel/:_idTravel/restoration/:compId", needsAuthToken, catchErrors(createRest));
router.post("/travel/:_idTravel/transportation/:compId", needsAuthToken, catchErrors(createTransp));
router.post("/travel/:_idTravel/plan/:compId", needsAuthToken, catchErrors(createPlan));
router.put("/:_id", needsAuthToken, catchErrors(updateScore));
router.get("/", catchErrors(getAll));
router.delete("/:_id",needsAuthToken,catchErrors(deleteOne));
router.get("/travel/:idTravel",needsAuthToken,catchErrors(findByTravel))
router.get("/component/:idComp",needsAuthToken,catchErrors(getScoreByComponent))


module.exports = router;