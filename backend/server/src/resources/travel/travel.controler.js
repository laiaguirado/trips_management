const addRoutesTo = (app) => {
  app.use("/v1/travel", require("./travel.router.v1"));
};

module.exports = {
  addRoutesTo,
};
