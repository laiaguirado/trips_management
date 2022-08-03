const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");
const { needsAuthToken } = require("../users/auth/auth.middleware");

const Comment = require("./comments.service");
const Accomodation = require("../components/accommodation/accommodation.service")
const User = require("../users/user.service")
const Travel = require("../travel/travel.service")

const create = async(req,res)=>{
    const compId = req.params.id
    const { email, _id, username } = req.userInfo;
    const { comment_text } = req.body;
    const {travelId} = req.params;

    const comment = await Comment.createOne(comment_text,compId,_id,travelId);
    const accommodation = await Accomodation.findOneById(compId);
    const user = await User.findById(_id);
    const travel = await Travel.findTravel(travelId);

    accommodation.comments.push(comment);
    await accommodation.save()

    user.comments.push(comment);
    await user.save()

    travel.comments.push(comment);
    await travel.save()

    res.status(200).json(comment);
   
}

const getAll = async(req,res) =>{
    const docs = await Comment.findAll();
    console.log(docs)
    res.status(200).json({ results: [docs] });
}

const deleteOne = async (req, res) => {
    const { _id } = req.params;
    res.status(200).json(await Comment.deleteComment(_id));
  };

  const getCommentsByTravel = async(req, res) =>{
    const {idTravel} = req.params;
    const doc = await Comment.findByTravelId(idTravel);
    res.status(200).json({ results: doc });
  }

const router = express.Router();

router.post("/:id/travel/:travelId", needsAuthToken, catchErrors(create));
router.get("/",needsAuthToken, catchErrors(getAll));
router.delete("/:_id",needsAuthToken,catchErrors(deleteOne));
router.get("/travel/:idTravel",needsAuthToken,catchErrors(getCommentsByTravel))

module.exports = router;