const addRoutesTo = (app) => {
    app.use("/comment/v1", require("./comments.router.v1"));
  };
  
  module.exports = {
    addRoutesTo,
  };
  