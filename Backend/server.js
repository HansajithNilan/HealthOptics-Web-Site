import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Ensure this matches the named export
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./Routes/UserRoute.js";
import Doctor from "./Routes/DoctorRoute.js";
import SpecReservationRoute from "./Routes/SpecReservationRoute.js";
import DoctorAppointmentRoute from "./Routes/DoctorAppointmentRoute.js";
import { dirname } from 'path'; // Import the route
import fs from 'fs';
import SpectacleRoute from "./Routes/SpectacleRoute.js"
import feedbackRoutes from './Routes/FeedbackRoute.js';

const app = express();
app.use(express.json());
app.use(cors({}));

dotenv.config();


// Ensure uploads directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the uploads directory


// Increase payload size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());



// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth/user", userRoutes);
app.use("/api/auth/reservation", SpecReservationRoute);

app.use("/api/auth/doctor", Doctor);
app.use("/api/doctors", Doctor); // Ensure this path matches the frontend request
app.use("/api/doctorappointment", DoctorAppointmentRoute); // Mount the route
app.use('/api/spectacle',SpectacleRoute)
app.use('/api/feedback', feedbackRoutes);

app.listen(3000, () => {
  connectDB(); // Call the connectDB function
  console.log(process.env.MONGO_URL);
  console.log("Server Started at http://localhost:3000");
});
