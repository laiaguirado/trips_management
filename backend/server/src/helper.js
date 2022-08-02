const { conn } = require("./db");

const capitalize = (val) => {
  if (typeof val !== "string") val = "";
  val = val.toLowerCase().trim();
  return val.charAt(0).toUpperCase() + val.substring(1);
};

const FKIntegrity = (model, id) => {
  return new Promise((resolve, reject) => {
    model.findOne({ _id: id }, (err, result) => {
      if (result) {
        return resolve(true);
      } else return resolve(false);
    });
  });
};

const runTransaction = async (handler) => {
  let result; //Wrapper for get result of session.withTransaction
  try {
    const session = await conn.startSession();
    await session.withTransaction(async () => {
      result = await handler();
    });
    session.endSession();
  } catch (error) {
    throw error;
  }
  return result;
};

module.exports = { capitalize, FKIntegrity, runTransaction };