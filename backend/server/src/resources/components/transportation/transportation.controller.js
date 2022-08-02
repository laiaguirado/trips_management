const addRoutesTo = (app) => {
  app.use(
    "/v1/travel/:id/transportation",
    require("./transportation.router.v1")
  );
};

module.exports = {
  addRoutesTo,
};
