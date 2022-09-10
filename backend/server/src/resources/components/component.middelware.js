const { errUnauthorized, errMalformed } = require("../../errors");
const { findComponent } = require("./component.service");
const { isTraveler } = require("../travel/travel.service");

const componentAllowedAction = async (req, res, next) => {
  try {
    if (req.method == "DELETE") {
      const { _id } = req.userInfo;
      const { _id: idComponent } = req.params;

      const component = await findComponent(idComponent);
      if (component) {
        const canDelete = await isTraveler(component.idTravel, _id);
        if (canDelete) {
          next();
        } else {
          errUnauthorized(`Action not allowed`);
        }
      } else {
        errMalformed("Not found");
      }
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  componentAllowedAction,
};
