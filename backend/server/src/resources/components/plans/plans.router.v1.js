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
const { TYPE_RESOURCE } = require("../component.service.js");
const { componentAllowedAction } = require("../component.middelware");
const RESOURCETYPE = TYPE_RESOURCE.PLANS;

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res.status(200).json({ api: "plans", ok: true, email, id: _id, username });
};

const addNewScoreToPlan = async (score, idPlan, idUser, idTravel) => {
  //Si el plan te un score, cal guardar la info i retornar-la
  const scoreCreated = await Scores.createOne(score, idPlan, idUser, idTravel);
  const planCreated = await Plans.addFirstScore(
    idPlan,
    scoreCreated._id,
    score
  );
  return planCreated;
};

const updateScoreToPlan = async (score, idPlan, idUser) => {
  const scoreUpdated = await Scores.updateScore(score._id, {
    score: score.score,
  });
  const planUpdated = await Plans.getPlanById(idPlan, idUser, "totalScore");
  return planUpdated;
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
      .json(
        await addNewScoreToPlan(scoreUser, planCreated._id, idUser, idTravel)
      );
  } else {
    res.status(201).json(planCreated);
  }
};

const getAllPlansByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;
  const include = req.query._include;

  res.status(200).json(await Plans.getAllPlansByTravel(idTravel, include));
};

const getPlanById = async (req, res) => {
  const { _id: idPlan } = req.params;
  const { _id: idUser } = req.userInfo;
  const include = req.query._include;
  res.status(200).json(await Plans.getPlanById(idPlan, idUser, include));
};

const deletePlan = async (req, res) => {
  const { _id: idPlan } = req.params;

  res.status(200).json(await Plans.deletePlan(idPlan));
};

const updatePlan = async (req, res) => {
  const planInfo = req.body;
  const { _id: idUser } = req.userInfo;
  const { _id: idPlan } = req.params;
  const scoreUser = planInfo.score ? planInfo.score : null;

  delete planInfo.score;
  const planUpdated = await Plans.updatePlan(idPlan, planInfo);

  if (scoreUser) {
    res.status(201).json(await updateScoreToPlan(scoreUser, idPlan, idUser));
  } else {
    res
      .status(201)
      .json(await await Plans.getPlanById(idPlan, idUser, "totalScore"));
  }
};

const routerPlansByTravel = express.Router();
const routerPlansByPlan = express.Router();

routerPlansByTravel.post(
  "/",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(createPlan)
);
routerPlansByTravel.get("/", needsAuthToken, catchErrors(getAllPlansByTravel));

if (config.isDevelopment) {
  routerPlansByPlan.get("/test", needsAuthToken, catchErrors(test));
}

routerPlansByPlan.get("/:_id", needsAuthToken, catchErrors(getPlanById));
routerPlansByPlan.delete(
  "/:_id",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(deletePlan)
);
routerPlansByPlan.put(
  "/:_id",
  needsAuthToken,
  componentAllowedAction,
  catchErrors(updatePlan)
);

module.exports = { routerPlansByTravel, routerPlansByPlan };
