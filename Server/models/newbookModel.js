const mongoose=require('mongoose');

const NewBookSchema = new mongoose.Schema({

    title : {
        type:String,
    },
    author : {
        type:String,
    },
    genre:{type:String},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userRegisterModel",
        required:true
    },
    isbn:String,
    publisher:String,
    date: { type: Date, default: Date.now },
    description:String
   

}, { timestamps: true })


const NewBookModel = mongoose.model("newBookModel", NewBookSchema);
module.exports = NewBookModel;
