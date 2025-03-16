import express from 'express'
import dotenv from 'dotenv'
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import cors from "cors"


import userRoutes from './Routes/UserRoute.js'

const app = express ();
app.use(express.json());

app.use(cors());

dotenv.config();





app.use('/api/auth/',userRoutes)

console.log(process.env.MONGO_URL)

app.listen(5000,()=>{
    connectDB()
    console.log("Server Started at http://localhost:5000")
});

