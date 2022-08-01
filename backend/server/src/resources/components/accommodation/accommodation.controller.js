const addRoutesTo = (app) => {
    app.use("/v1/accommodation", require("./accommodation.router.v1"));

  };
  module.exports = {
    addRoutesTo,
  };
  