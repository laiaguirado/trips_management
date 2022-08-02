
const Comment = require("./comments.model");


const createOne = async(text,compId,_id)=>{
        return await Comment.create({
            comment:text,
            idComponent:compId,
            idUser:_id,
        });
}

const findAll = async() =>{
        return await Comment.find().lean().exec()
}

module.exports = {createOne,findAll}