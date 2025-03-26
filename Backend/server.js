import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';  // Change this line to use default import
import { connect } from 'mongoose';
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
import { dirname } from 'path';

import userRoutes from './Routes/UserRoute.js'

import doctorRoutes from "./Routes/DoctorRoute.js"; // Ensure this path is correct

import SpecReservationRoute from './Routes/SpecReservationRoute.js'

import SpectacleRoute from "./Routes/SpectacleRoute.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Increase payload size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

// Ensure uploads directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/auth/',userRoutes)
app.use('/api/auth/reservation',SpecReservationRoute)
app.use("/api/spectacle", SpectacleRoute);
app.use("/api/doctors", doctorRoutes);

//console.log(process.env.MONGO_URL)

app.listen(5000,()=>{
    console.log(process.env.MONGO_URL);
    console.log("Server Started at http://localhost:5000")
});
