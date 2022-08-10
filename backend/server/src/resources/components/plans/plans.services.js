const Plans = require("./plans.model");
const Travel = require("../../travel/travel.model");
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

const getAllPlansByTravel = async (idTravel) => {
  return await Plans.find({ idTravel })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .lean({ getters: true, virtuals: true })
    .exec();
};

const getPlanById = async (idPlan) => {
  const plan = await Plans.findOne({ _id: idPlan })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .lean({ getters: true, virtuals: true })
    .exec();
  if (plan === null) {
    errMalformed(`Plan with not found`);
  }
  return plan;
};

const deletePlan = async (_id) => {
  const plan = await runTransaction(async () => {
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
    .lean()
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
};
