const { errUnauthorized, errMalformed } = require("../../errors");
const { findComponent } = require("./component.service");
const { isTraveler } = require("../travel/travel.service");

const componentAllowedAction = async (req, res, next) => {
  const { _id } = req.userInfo;
  let idTravel;
  try {
    if (req.method === "DELETE" || req.method === "PUT") {
      const { _id: idComponent } = req.params;
      const component = await findComponent(idComponent);
      if (component) {
        idTravel = component.idTravel;
      } else {
        errMalformed("Not found");
      }
    } else if (req.method === "POST") {
      idTravel = req.paramsParentRouter.idTravel;
    } else {
      next();
    }

    const candDoAction = await isTraveler(idTravel, _id);
    if (candDoAction) {
      next();
    } else {
      errUnauthorized(`Action not allowed`);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  componentAllowedAction,
};
