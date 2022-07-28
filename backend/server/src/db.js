const mongoose = require("mongoose");
const config = require("./config");

const connect = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Mongoose connected");
  } catch (e) {
    console.error(`Could not connect to MongoDB: ${e}`);
  }
};

const conn = mongoose.connection;

const disconnect = async () => {
  return mongoose.connection.close();
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
    session.endSession();
    throw error;
  }
  return result;
};

module.exports = {
  connect,
  disconnect,
  runTransaction,
};
