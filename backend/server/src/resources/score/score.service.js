const Score = require("./score.model");


const createOne = async(value,compId,user_id)=>{
        return await Score.create({
            score:value,
            idComponent:compId,
            idUser:user_id
        });
}

const findAll = async()=>{
        return await Score.find().lean().exec()

}

module.exports = {createOne,findAll}