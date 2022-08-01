const addRoutesTo = (app) => {
    app.use("/v1/comment", require("./comments.router.v1"));
  };
  
  module.exports = {
    addRoutesTo,
  };
  