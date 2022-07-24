require("dotenv").config();

const envVarNames = [
  "NODE_ENV",
  "FRONTEND_DIR",
  "SERVER_PORT",
  "JWT_SECRET",
  "JWT_EXPIRATION",
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "DB_DATABASE",
];

let envVars = {};

envVarNames.forEach((varName) => {
  if (process.env[varName] === undefined) {
    throw new Error(`Missing environment variable '${varName}'`);
  }
  envVars[varName] = process.env[varName];
});

const getMongoURL = () => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = envVars;
  return `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;
};

module.exports = {
  ...envVars,
  isDevelopment: process.env.NODE_ENV === "development",
  MONGO_URL: getMongoURL(),
};
