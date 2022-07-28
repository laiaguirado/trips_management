
const Comment = require("./comments.model");


const createOne = async(text,compId)=>{
        return await Comment.create({
            comment:text,
            idComponent:compId
        });
}

const findAll = async() =>{
        return await Comment.find().lean().exec()
}

module.exports = {createOne,findAll}