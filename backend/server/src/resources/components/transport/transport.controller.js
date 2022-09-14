const passParamsToRouterChild = (req, res, next) => {
  req.paramsParentRouter = { idTravel: req.params.idTravel };
  next();
};
const addRoutesTo = (app) => {
  app.use("/v1/transport", require("./transport.router.v1").routerByTransport);

  app.use(
    "/v1/travel/:idTravel/transport",
    passParamsToRouterChild,
    require("./transport.router.v1").routerByTravel
  );
};

module.exports = {
  addRoutesTo,
};
