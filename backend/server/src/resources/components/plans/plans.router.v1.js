const express = require("express");
const {
  catchErrors,
  TripManagementApiError,
  errMalformed,
} = require("../../../errors");
const config = require("../../../config");
const { needsAuthToken } = require("../../users/auth/auth.middleware");
const Plans = require("./plans.services");
const RESOURCETYPE = "Plans";

const test = async (req, res) => {
  const { email, _id, username } = req.userInfo;
  res.status(200).json({ api: "plans", ok: true, email, id: _id, username });
};

const createPlan = async (req, res) => {
  const { _id } = req.userInfo;
  const { idTravel } = req.paramsParentRouter;

  const planInfo = req.body;
  planInfo.idUser = _id;
  planInfo.idTravel = idTravel;
  planInfo.resourceType = RESOURCETYPE;

  res.status(201).json(await Plans.createPlan(planInfo));
};

const getAllPlansByTravel = async (req, res) => {
  const { idTravel } = req.paramsParentRouter;

  res.status(200).json(await Plans.getAllPlansByTravel(idTravel));
};

const getPlanById = async (req, res) => {
  const { idPlan } = req.params;

  res.status(200).json(await Plans.getPlanById(idPlan));
};

const deletePlan = async (req, res) => {
  const { idPlan } = req.params;

  res.status(200).json(await Plans.deletePlan(idPlan));
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

module.exports = { routerPlansByTravel, routerPlansByPlan };
