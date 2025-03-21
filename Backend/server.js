import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

// Initialize express app
const app = express();

<<<<<<< Updated upstream
<<<<<<< Updated upstream
import userRoutes from './Routes/UserRoute.js'

import Doctor from './Routes/DoctorRoute.js'; // Correct path


import SpecReservationRoute from './Routes/SpecReservationRoute.js'


const app = express ();
app.use(express.json());

app.use(cors());

=======
// Load environment variables
>>>>>>> Stashed changes
=======
// Load environment variables
>>>>>>> Stashed changes
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

// Import routes
import userRouter from './Routes/UserRoute.js';
import DoctorRoute from './Routes/DoctorRoute.js';

<<<<<<< Updated upstream
<<<<<<< Updated upstream
app.use('/api/auth/',userRoutes)
app.use('/api/auth/reservation',SpecReservationRoute)

//console.log(process.env.MONGO_URL)

app.listen(5000,()=>{
    connectDB()
    console.log("Server Started at http://localhost:5000")
});
=======
// Use routes
app.use('/api/user', userRouter);
app.use('/api/doctor', DoctorRoute);
>>>>>>> Stashed changes
=======
// Use routes
app.use('/api/user', userRouter);
app.use('/api/doctor', DoctorRoute);
>>>>>>> Stashed changes

// Connect to MongoDB
mongoose.connect(URL)
  .then(() => {
    console.log('MongoDB connection successfully');
    
    // Start server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is up and running on port number ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });