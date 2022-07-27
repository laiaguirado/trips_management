const addRoutesTo = (app) => {
    app.use("/score/v1", require("./score.router.v1"));

  };
  module.exports = {
    addRoutesTo,
  };
  