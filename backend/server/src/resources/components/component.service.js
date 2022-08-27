const {Component} = require("./component.model");

const findComponentById = async(idComp)=>{
    try {
      return await Component.findOne({ _id: idComp });
    } catch (e) {
      res.status(500).json({ error: "Internal error" });
    }
  }

  
module.exports = { findComponentById };
