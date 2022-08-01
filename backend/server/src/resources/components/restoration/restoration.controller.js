const addRoutesTo = (app) => {
    app.use("/v1/restoration", require("./restoration.router.v1"));

  };
  module.exports = {
    addRoutesTo,
  };
  