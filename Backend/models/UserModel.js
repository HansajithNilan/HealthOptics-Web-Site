import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please Enter User Name "],
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"user"

    }

})

const UserModel = mongoose.model ('User',UserSchema);
export default UserModel;