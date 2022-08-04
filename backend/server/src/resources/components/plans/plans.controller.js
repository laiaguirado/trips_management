const passParamsToRouterChild = (req, res, next) => {
  req.paramsParentRouter = { idTravel: req.params.idTravel };
  next();
};
const addRoutesTo = (app) => {
  app.use(
    "/v1/travel/:idTravel/plans",
    passParamsToRouterChild,
    require("./plans.router.v1").routerPlansByTravel
  );
  app.use("/v1/plans", require("./plans.router.v1").routerPlansByPlan);
};

module.exports = {
  addRoutesTo,
};
