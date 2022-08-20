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

const getPrice = (v) => {
  if (!v) return v;
  return `${(v / 100).toFixed(2)}`;
};

const setPrice = (v) => {
  if (!v) return v;
  return v * 100;
};

function getPriceWithCurrency(price, currency) {
  const currencyOut = currency ? currency : "";
  if (price !== null && price !== undefined) {
    const numberFormat = new Intl.NumberFormat("es-ES");
    const priceFormat = numberFormat.format(price);
    return `${priceFormat} ${currencyOut}`;
  }
  return "";
}
module.exports = {
  capitalize,
  FKIntegrity,
  runTransaction,
  getPrice,
  setPrice,
  getPriceWithCurrency,
};
