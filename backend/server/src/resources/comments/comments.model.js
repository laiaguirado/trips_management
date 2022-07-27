const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
    {
        idUser:{
            type:String
        },
        idTravel:{
            type:String
        },
        idComponent:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"component"
        },
        comment:{
            type:String,
            maxlength: [250, "'{VALUE}' is too long"]
        },
    },
    {timestamps:true}
);
const Comment = mongoose.model("comment", commentsSchema);

module.exports = Comment;