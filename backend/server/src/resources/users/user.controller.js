const addRoutesTo = (app) => {
  app.use("/v1/user", require("./user.router.v1"));
  app.use("/v2/user", require("./user.router.v2"));
};

module.exports = {
  addRoutesTo,
};
