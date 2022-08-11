const { errMalformed, errUnauthorized } = require("../../errors");
const User = require("./user.model");
const auth = require("./auth/auth.service");

const createUser = async ({ email, password, username }) => {
  const encryptedPassword = await auth.encryptPassword(password);
  return await User.create({ email, username, password: encryptedPassword });
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
  const token = auth.createToken(email, userDb._id, userDb.username);
  return token;
};

const findAllUsers = async () => {
  return await User.find()
    .populate({
      path: "travels",
      select: "-_id -travellers",
    })
    .lean()
    .exec();
};

const findById = async (_id) => {
  const user = await User.findOne({ _id }).populate({
    path: "travels",
  });
  if (user === null) {
    errMalformed("User doens't exist");
  }
  return user;
};
const findByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (user === null) {
    errMalformed("User doens't exist");
  }
  return user;
};

module.exports = {
  createUser,
  authenticateUser,
  findAllUsers,
  findById,
  findByEmail,
};
