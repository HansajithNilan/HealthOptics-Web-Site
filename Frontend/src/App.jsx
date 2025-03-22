import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import AddDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/AddDoctorAppointmentDetails.jsx";
import AddPatientDetails from "./pages/HomePage/doctorappointment/PatientDetailsForm.jsx";

import Dashboard from "./pages/AdminPage/Dashboard.jsx";
import SpectacleManage from "./pages/AdminPage/SpectacleManage.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addappointment" element={<AddDoctorAppointmentDetails />} />
        <Route path="/addpatient" element={<AddPatientDetails />} />
   
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/spectacles" element={<SpectacleManage />} />

      </Routes>
    </BrowserRouter>
  );
}



export default App;
