const { errUnauthorized } = require("../../../errors");
const auth = require("./auth.service");

const needsAuthToken = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      errUnauthorized(`Missing auth header`);
    }
    if (!header.startsWith("Bearer ")) {
      errUnauthorized(`Authorization header doesn't start with "Bearer"`);
    }
    const token = header.slice("Bearer ".length);
    const { email, _id, name } = auth.decodeToken(token);
    req.userInfo = { email, _id, name };
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  needsAuthToken,
};
