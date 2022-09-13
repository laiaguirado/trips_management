// const addRoutesTo = (app) => {
//     app.use("/v1/restaurant", require("./restaurant.router.v1"));

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
    "/v1/travel/:idTravel/restaurant",
    passParamsToRouterChild,
    require("./restaurant.router.v1").routerRestaurantByTravel
  );
  app.use(
    "/v1/restaurant",
    require("./restaurant.router.v1").routerRestaurantByRestaurant
  );
};

module.exports = {
  addRoutesTo,
};
