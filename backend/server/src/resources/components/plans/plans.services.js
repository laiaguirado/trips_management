const Plans = require("./plans.model");
const Travel = require("../../travel/travel.model");
const Score = require("../../score/score.model");
const mongoose = require("mongoose");

const Comment = require("../../comments/comments.model");
const { runTransaction } = require("../../../helper");
const { errMalformed } = require("../../../errors");

const createPlan = async (plan) => {
  const planToDo = await runTransaction(async () => {
    const planCreated = await Plans.create(plan);

    const travel = await Travel.findOneAndUpdate(
      { _id: plan.idTravel },
      { $push: { plans: planCreated._id } },
      { new: true, useFindAndModify: false, runValidators: true }
    );
    return planCreated;
  });
  return planToDo;
};

const findOneById = async (id) => {
  return await Plans.findOne({ _id: id });
};

const getAllPlansByTravel = async (idTravel) => {
  return await Plans.find({ idTravel })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .lean({ getters: true, virtuals: true })
    .exec();
};

const getPlanById = async (idPlan, idUser) => {
  const plan = await Plans.findOne({ _id: idPlan })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .populate({
      path: "scores",
      match: { idUser: { $eq:  mongoose.Types.ObjectId(idUser) } },
      select: "score -_id"
    })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (plan === null) {
    errMalformed(`Plan not found`);
  }

  const total = await Plans.aggregate(
    [ 
      {
        $lookup: {
          from: "scores",
          localField: "scores",
          foreignField: "_id",
          as: "resultingArray",
        },
      },
      { $unwind: "$resultingArray" },
      {
        $group: {
          _id: "$_id",
          average: { $avg: "$resultingArray.score" },
          points: { $sum: "$resultingArray.score" },
          votes: { $sum: 1 },
        },
      },
      {
        $match: { _id: { $eq: mongoose.Types.ObjectId(idPlan)  }}
      }      
    ],
    function (err, result) {
      //console.log(result);
      // console.log(err);
    }
  );
  plan.totalScore = total;

  return plan;
};;

const getOne = async (_id) => {
  const plan = await Plans.findOne({ _id });

  if (plan === null) {
    errMalformed(`Plan not found`);
  }
  return plan;
};

const deletePlan = async (_id) => {
  const plan = await runTransaction(async () => {
    const comments = await Plans.findOne({_id}).select('comments');
    const comments1 = comments['comments'];
    for (comment of comments1){
      console.log(comment);
      await Comment.findByIdAndDelete({_id:comment})
}
const scores = await Plans.findOne({_id}).select('scores');
const scores1 = scores['comments'];
for (comment of scores1){
  console.log(comment);
  await Score.findByIdAndDelete({_id:comment})
}
    const deleted = await Plans.findByIdAndDelete({ _id }).lean().exec();

    if (deleted === null) {
      errMalformed(`Plan not found`);
    }

    const travel = await Travel.findOneAndUpdate(
      { _id: deleted.idTravel },
      { $pull: { plans: _id } },
      { new: true, useFindAndModify: false }
    );

    return deleted;
  });
  return plan;
};

const updatePlan = async (_id, planInfo) => {
  const planUpdated = await Plans.findOneAndUpdate({ _id }, planInfo, {
    new: true,
  })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (planUpdated === null) {
    errMalformed(`Plan not found`);
  }
  return planUpdated;
};

module.exports = {
  createPlan,
  getAllPlansByTravel,
  getPlanById,
  deletePlan,
  updatePlan,
  getOne,
  findOneById
};
