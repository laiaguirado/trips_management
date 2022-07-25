const addRoutesTo = (app) => {
    app.use("/accommodation/v1", require("./accommodation.router.v1"));

  };
  module.exports = {
    addRoutesTo,
  };
  