const Score = require("./score.model");


const createOne = async(value,compId,user_id)=>{
    try{
        return await Score.create({
            score:value,
            idComponent:compId,
            idUser:user_id
        });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal error' });  
    }
}

const findAll = async()=>{
    try{
        return await Score.find().lean().exec()
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal error' });  
    }
}

module.exports = {createOne,findAll}