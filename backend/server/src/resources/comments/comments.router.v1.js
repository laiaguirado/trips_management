const { Router } = require("express");
const { route } = require("express/lib/application");
const express = require("express");
const { catchErrors, TripManagementApiError } = require("../../errors");

const Comment = require("./comments.service");
const Accomodation = require("../components/accommodation/accommodation.service")
const User = require("../users/user.service")

const create = async(req,res)=>{
    const compId = req.params.id
    const { comment_text } = req.body;
    const { user_id } = req.body;
    console.log(compId);
    console.log(comment_text );

    const comment = await Comment.createOne(comment_text,compId);

    const accommodation = await Accomodation.findOneById(compId);

    const user = await User.findById(user_id);

    accommodation.comments.push(comment);
    await accommodation.save()

    user.comments.push(comment);
    await user.save()

    res.status(200).json({ status: `User ${user_id} added Comment ${comment._id} to resource: ${compId}` });
   
}

const getAll = async(req,res) =>{
    const docs = await Comment.findAll();
    console.log(docs)
    res.status(200).json({ results: [docs] });
}

const router = express.Router();

router.post("/create/:id", catchErrors(create));
router.get("/getAll", catchErrors(getAll));

module.exports = router;