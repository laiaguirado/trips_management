const express = require("express");
const {
  catchErrors,
  TripManagementApiError,
  errMalformed,
} = require("../../../errors");
const config = require("../../../config");
const { needsAuthToken } = require("../../users/auth/auth.middleware");
const Plans = require("./plans.services");
const Scores = require("../../score/score.service");
const RESOURCETYPE = "Plans";

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res.status(200).json({ api: "plans", ok: true, email, id: _id, username });
};

const addScoreToPlan = async (score, idPlan, idUser, idTravel) => {
  //Si el plan te un score, cal guardar la info i retornar-la
  const scoreCreated = await Scores.createOne(score, idPlan, idUser, idTravel);
  const planCreated = await Plans.addFirstScore(
    idPlan,
    scoreCreated._id,
    score
  );
  return planCreated;
};

const createPlan = async (req, res) => {
  const { _id: idUser } = req.userInfo;
  const { idTravel } = req.paramsParentRouter;
  const planInfo = req.body;
  const scoreUser = planInfo.score ? planInfo.score : null;

  delete planInfo.score;
  planInfo.idUser = idUser;
  planInfo.idTravel = idTravel;
  planInfo.resourceType = RESOURCETYPE;

  const planCreated = await Plans.createPlan(planInfo);

  if (scoreUser) {
    res
      .status(201)
      .json(await addScoreToPlan(scoreUser, planCreated._id, idUser, idTravel));
  }
  res.status(201).json(planCreated);
};

const getAllPlansByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  const include = req.query._include;

  res.status(200).json(await Plans.getAllPlansByTravel(idTravel, include));
};

const getPlanById = async (req, res) => {
  const { idPlan } = req.params;
  const { _id: idUser } = req.userInfo;
  const include = req.query._include;
  res.status(200).json(await Plans.getPlanById(idPlan, idUser, include));
};

const deletePlan = async (req, res) => {
  const { idPlan } = req.params;

  res.status(200).json(await Plans.deletePlan(idPlan));
};

const updatePlan = async (req, res) => {
  const planInfo = req.body;
  const { idPlan } = req.params;

  res.status(200).json(await Plans.updatePlan(idPlan, planInfo));
};

const routerPlansByTravel = express.Router();
const routerPlansByPlan = express.Router();

routerPlansByTravel.post("/", needsAuthToken, catchErrors(createPlan));
routerPlansByTravel.get("/", needsAuthToken, catchErrors(getAllPlansByTravel));

if (config.isDevelopment) {
  routerPlansByPlan.get("/test", needsAuthToken, catchErrors(test));
}

routerPlansByPlan.get("/:idPlan", needsAuthToken, catchErrors(getPlanById));
routerPlansByPlan.delete("/:idPlan", needsAuthToken, catchErrors(deletePlan));
routerPlansByPlan.put("/:idPlan", needsAuthToken, catchErrors(updatePlan));

module.exports = { routerPlansByTravel, routerPlansByPlan };
