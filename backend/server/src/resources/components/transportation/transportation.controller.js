const passParamsToRouterChild = (req, res, next) => {
  req.paramsParentRouter = { idTravel: req.params.idTravel };
  next();
};
const addRoutesTo = (app) => {
  app.use(
    "/v1/transportation",
    require("./transportation.router.v1").routerByTransportation
  );

  app.use(
    "/v1/travel/:idTravel/transportation",
    passParamsToRouterChild,
    require("./transportation.router.v1").routerByTravel
  );
};

module.exports = {
  addRoutesTo,
};
