const addRoutesTo = (app) => {
  app.use("/user/v1", require("./user.router.v1"));
  app.use("/user/v2", require("./user.router.v2"));
};

module.exports = {
  addRoutesTo,
};
