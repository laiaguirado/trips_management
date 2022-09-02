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
  const plans = await Plans.find({ idTravel })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (plans) {
    const totales = await Plans.aggregate(
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
      ],
      function (err, result) {
        // console.log(result);
        // console.log(err);
      }
    );

    const completPlans = plans.map((plan) => {
      return {
        ...plan,
        totalScore: {
          ...totales.find((total) =>
            mongoose.Types.ObjectId(total._id).equals(
              mongoose.Types.ObjectId(plan._id)
            )
          ),
        },
      };
    });
    return completPlans;
  } else {
    return plans;
  }
  
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
    const deleted = await Plans.findByIdAndDelete({ _id }).lean().exec();
    await Comment.deleteMany({idComponent:_id}).exec();
    await Score.deleteMany({idComponent:_id}).exec();
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
