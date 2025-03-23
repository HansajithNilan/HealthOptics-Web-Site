import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import cors from "cors";

import userRoutes from "./Routes/UserRoute.js";
import Doctor from "./Routes/DoctorRoute.js";
import SpecReservationRoute from "./Routes/SpecReservationRoute.js";
import PatientRoute from "./Routes/PatientRoute.js"; // Import PatientRoute

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.use("/api/auth/", userRoutes);
app.use("/api/auth/reservation", SpecReservationRoute);
app.use("/api/auth/doctor", Doctor);
app.use("/api/auth/patient", PatientRoute); // Use PatientRoute

app.listen(5000, () => {
  connectDB();
  console.log(process.env.MONGO_URL);
  console.log("Server Started at http://localhost:5000");
});
