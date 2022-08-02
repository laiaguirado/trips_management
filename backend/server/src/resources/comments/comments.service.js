
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

const deleteComment = async(_id) =>{
        const deleted = await Comment.findByIdAndDelete({_id}).lean().exec();
        if (deleted === null){
            errMalformed(`Comment with ${id} not found`);
        }
        return deleted
      }

module.exports = {createOne,findAll, deleteComment}