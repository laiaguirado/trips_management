// const addRoutesTo = (app) => {
//     app.use("/v1/restoration", require("./restoration.router.v1"));

//   };
//   module.exports = {
//     addRoutesTo,
//   };

const passParamsToRouterChild = (req, res, next) => {
  req.paramsParentRouter = { idTravel: req.params.idTravel };
  next();
};

const addRoutesTo = (app) => {
  app.use(
    "/v1/travel/:idTravel/restoration",
    passParamsToRouterChild,
    require("./restoration.router.v1").routerRestaurantByTravel
  );
  app.use(
    "/v1/restoration",
    require("./restoration.router.v1").routerRestaurantByRestaurant
  );
};

module.exports = {
  addRoutesTo,
};
