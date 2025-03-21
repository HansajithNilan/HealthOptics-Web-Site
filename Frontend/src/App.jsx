import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import AddDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/AddDoctorAppointmentDetails.jsx";
import AddPatientDetails from "./pages/HomePage/doctorappointment/PatientDetailsForm.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addappointment" element={<AddDoctorAppointmentDetails />} />
        <Route path="/addpatient" element={<AddPatientDetails />} />
        
   

      </Routes>
    </BrowserRouter>
  );
}



export default App;
