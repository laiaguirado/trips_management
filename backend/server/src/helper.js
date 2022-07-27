const capitalize = (val) => {
  if (typeof val !== "string") val = "";
  val = val.toLowerCase().trim();
  return val.charAt(0).toUpperCase() + val.substring(1);
};

module.exports = { capitalize };
