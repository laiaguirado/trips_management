const mongoose = require("mongoose");

class image extends mongoose.SchemaType {
  url;
  extension;
  data;

  constructor(key, options) {
    super(key, options, "Image");
  }
  cast = function (val) {
    if (!val.data && !val.extension && !val.url) {
      return false;
    }
    return val;
  };
}

module.exports = image;
