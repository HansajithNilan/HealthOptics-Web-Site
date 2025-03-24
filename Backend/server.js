import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import cors from "cors";

import userRoutes from "./Routes/UserRoute.js";
import Doctor from "./Routes/DoctorRoute.js";
import DoctorAppointmentRoute from "./Routes/DoctorAppointmentRoute.js"; // Import DoctorAppointmentRoute
import SpecReservationRoute from "./Routes/SpecReservationRoute.js";
import SpectacleRoute from "./Routes/SpectacleRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.use("/api/auth/", userRoutes);
app.use("/api/auth/reservation", SpecReservationRoute);
app.use("/api/auth/doctor", Doctor);
app.use("/api/doctorappointment", DoctorAppointmentRoute); // Use DoctorAppointmentRoute
app.use("/api/spectacle", SpectacleRoute);

app.listen(5000, () => {
    connectDB();
    console.log(process.env.MONGO_URL);
    console.log("Server Started at http://localhost:5000");
});
