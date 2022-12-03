const mongoose=require('mongoose');

const UserRegisterSchema = new mongoose.Schema({

    user_name : String,
    password : String
    

}, { timestamps: true })


const UserRegisterModel = mongoose.model("userRegisterModel", UserRegisterSchema);
module.exports = UserRegisterModel;
