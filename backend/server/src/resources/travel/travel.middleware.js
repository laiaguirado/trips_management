const { errUnauthorized } = require("../../errors");
const Travel = require("./travel.service");

const allowedAction = async (req, res, next) => {
  try {
    if (req.method == "DELETE") {
      const { _id: idTravel } = req.params;
      const { _id } = req.userInfo;
      const travel = await Travel.findTravel(idTravel);
      if (travel.creator.toString() === _id.toString()) {
        next();
      } else {
        errUnauthorized(`Action not allowed`);
      }
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  allowedAction,
};
