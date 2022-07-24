const { errMalformed, errUnauthorized } = require("../../errors");
const User = require("./user.model");
const auth = require("./auth/auth.service");

const createUser = async ({ email, password, name }) => {
  const encryptedPassword = await auth.encryptPassword(password);
  return await User.create({ email, name, password: encryptedPassword });
};

const authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
    errUnauthorized("Wrong email or password");
  }
  const userDb = await User.findOne({ email })
    .select("+password")
    .lean()
    .exec();
  if (!userDb) {
    errUnauthorized("Wrong email or password");
  }

  const passwordMatch = await auth.comparePasswords(password, userDb.password);
  if (!passwordMatch) {
    errUnauthorized("Wrong email or password");
  }
  const token = auth.createToken(email, userDb._id, userDb.name);
  return token;
};

module.exports = { createUser, authenticateUser };
