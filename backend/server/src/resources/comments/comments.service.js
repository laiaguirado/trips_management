
const Comment = require("./comments.model");


const createOne = async(text,compId)=>{
    try{
        return await Comment.create({
            comment:text,
            idComponent:compId
        });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal error' });  
    }
}

const findAll = async() =>{
    try{
        return await Comment.find().lean().exec()
    }catch(e){
        console.log(e);
      res.status(500).json({ error: 'Internal error' });

    }
}

module.exports = {createOne,findAll}