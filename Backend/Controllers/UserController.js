import UserModel from '../models/UserModel.js';
import User  from '../models/UserModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { ensureAuthenticated } from '../middlewares/ensureAuth.js';



export const createUsers = async(req,res )=>{
    try{
        const {name, email,password,role} = req.body;

        if(!name|| !email || !password ) {
            return res.status(422).json({message : 'Please fill in all fields (name,email,password)'})
        }
        if(await User.findOne({email})){
            return res.status(409).json({message:"Email already exists"})
        }

        const hashPassword = await bcrypt.hash(password,10) 

        const newUser = await User.create({
            name,
            email,
            password:hashPassword,
            role,
        })

        return res.status(201).json({message : "User Registerd Successfull"})

    }catch(error){
        return res.status(500).json({message:error.message})

    }
}

export const userlogin = async(req,res,)=>{
    try{
        const {email,password} = req.body;

        if(!email|| !password){
            return res.status(422).json({message:"Please Fill all fields (email,password)"})
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(401).json({message:"Email or Password Invalid"})
        }

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch){
            return res.status(401).json({message:"email or Password is invalid"})

        }
        const accessToken = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1h'})

        return res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email,
            accessToken
        })

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}


export const getAllusers = async (req,res)=>{

    try{


        const users = await UserModel.find()

        if(!users){
            return res.status(422).json({message:"Users not Founds!"})
        }

        return res.status(200).json(users)


    }catch(error){
        return res.status(500).json({message:error.message})
    }

}

export const getCurrentUser = async(req,res)=>{

    try{
        const user = await UserModel.findOne({_id:req.user.id})

        return res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email
        })


    }catch(error){
return res.status(500).json({message:error.message})
    }

}


