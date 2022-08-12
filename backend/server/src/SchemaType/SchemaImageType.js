const mongoose = require("mongoose");

class image extends mongoose.SchemaType {
  url;
  extension;
  name;

  constructor(key, options) {
    super(key, options, "Image");
  }
  cast = function (val) {
    return isUrl(val) || isFile(val) ? val : false;
  };
}

const isFile = (val) => {
  return (
    val &&
    val.hasOwnProperty("extension") &&
    val.extension.length != 0 &&
    val.hasOwnProperty("name") &&
    val.name.length != 0
  );
};

const isUrl = (val) => {
  return val && val.hasOwnProperty("url") && val.url.length != 0;
};

module.exports = image;
