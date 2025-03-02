import express from 'express'
import dotenv from 'dotenv'
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';

const app = express ();
dotenv.config();


app.get('/',(req,res)=>{
    res.send("nilan")
})


console.log(process.env.MONGO_URL)

app.listen(5000,()=>{
    connectDB()
    console.log("Server Started at http://localhost:5000")
});

