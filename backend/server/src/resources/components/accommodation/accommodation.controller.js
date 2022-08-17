const passParamsToRouterChild = (req, res, next) => {
  req.paramsParentRouter = { idTravel: req.params.idTravel };
  next();
};
const addRoutesTo = (app) => {
  app.use("/v1/travel/:idTravel/accommodation", passParamsToRouterChild, require("./accommodation.router.v1").routerAccommodationByTravel);
  app.use("/v1/accommodation", require("./accommodation.router.v1").routerAccommodationByAccommodation);
};

module.exports = {
  addRoutesTo,
};
