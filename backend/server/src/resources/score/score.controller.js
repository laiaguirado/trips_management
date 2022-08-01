const addRoutesTo = (app) => {
    app.use("/v1/score", require("./score.router.v1"));

  };
  module.exports = {
    addRoutesTo,
  };
  