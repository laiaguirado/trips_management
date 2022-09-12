const { errUnauthorized, errMalformed } = require("../../errors");
const { findComponent } = require("../components/component.service");
const { isTraveler } = require("../travel/travel.service");
const { findCommentById } = require("./comments.service");

const commentAllowedAction = async (req, res, next) => {
  const { _id: idUser } = req.userInfo;
  try {
    if (req.method === "DELETE" || req.method === "PUT") {
      const { _id: idComment } = req.params;
      const comment = await findCommentById(idComment);
      if (comment.idUser.toString() === idUser.toString()) {
        next();
      } else {
        errUnauthorized(`Action not allowed`);
      }
    } else if (req.method === "POST") {
      const { idComp, travelId: idTravel } = req.params;
      const component = await findComponent(idComp);
      if (component) {
        if (component.idTravel.toString() !== idTravel.toString()) {
          errMalformed("Not found");
        }
        const canDoAction = await isTraveler(idTravel, idUser);
        if (!canDoAction) {
          errUnauthorized(`Action not allowed`);
        }
      } else {
        errMalformed("Not found");
      }
      next();
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  commentAllowedAction,
};
