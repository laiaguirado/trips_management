const Plans = require("./plans.model");
const Travel = require("../../travel/travel.model");
const Score = require("../../score/score.model");
const mongoose = require("mongoose");
const Comment = require("../../comments/comments.model");
const { runTransaction,isValidParameter } = require("../../../helper");
const { errMalformed } = require("../../../errors");

const paramValueInclude = ["totalScore"];
// const isValidParameter = (parameter, value) =>
//   parameter.find((param) => param === value);

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

const addFirstScore = async (idPlan, idScore, score) => {
  const planUpdated = await Plans.findOneAndUpdate(
    { _id: idPlan },
    { $push: { scores: idScore } },
    { new: true, useFindAndModify: false, runValidators: true }
  );
  //Modify the total score. Since there is only one vote, we will not calculate it with the aggregate function
  planUpdated.totalScore = {
    average: score,
    votes: 1,
    points: score,
  };
  return planUpdated;
};


const findOneById = async (id) => {
  return await Plans.findOne({ _id: id });
};

const getScores = async (idPlan) => {
  const filterBy = idPlan
    ? {
        $match: { _id: { $eq: mongoose.Types.ObjectId(idPlan) } },
      }
    : { $match: {} };

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
      filterBy,
    ],
    function (err, result) {
      // console.log(result);
      // console.log(err);
    }
  );
  return totales;
};

const getAllPlansByTravel = async (idTravel, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo)) {
    errMalformed("Wrong query parameter");
  }

  const plans = await Plans.find({ idTravel })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .lean({ getters: true, virtuals: true })
    .exec();
  if (plans && additionalInfo === "totalScore") {
    const totales = await getScores();

    if (totales) {
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
    }
  }
  return plans;
};

const getPlanById = async (idPlan, idUser, additionalInfo) => {
  if (additionalInfo && !isValidParameter(paramValueInclude, additionalInfo))
    errMalformed("Wrong query parameter");

  const plan = await Plans.findOne({ _id: idPlan })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .populate({
      path: "scores",
      match: { idUser: { $eq: mongoose.Types.ObjectId(idUser) } },
      select: "score",
    })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (plan === null) {
    errMalformed(`Plan not found`);
  }

  if (additionalInfo === "totalScore") {
    const total = await getScores(idPlan);
    console.log(total);
    if (total.length === 1) {
      plan.totalScore = total[0];
    }
  }
  return plan;
};

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
    await Comment.deleteMany({ idComponent: _id }).exec();
    await Score.deleteMany({ idComponent: _id }).exec();
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
    runValidators: true,
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
  findOneById,
  addFirstScore,
};
