const mongoose = require('mongoose');
const config = require('./config');

const connect = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Mongoose connected");
  } catch (e) {
    console.error(`Could not connect to MongoDB: ${e}`);
  }
}

const disconnect = async () => {
  return mongoose.connection.close();
}

module.exports = {
  connect,
  disconnect,
}