import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

import AddDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/AddDoctorAppointmentDetails";
import MyAppointmentScreen from "./pages/HomePage/doctorappointment/MyAppointmentScreen";
import OphthalmologistsScreen from "./pages/HomePage/doctorappointment/OphthalmologistsScreen";
import PatientDetailsForm from "./pages/HomePage/doctorappointment/PatientDetailsForm";
import UpdateDocotAppointmenteScreen from "./pages/HomePage/doctorappointment/UpdateDocotAppointmenteScreen";
import UpdateDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/UpdateDoctorAppointmentDetails";
import ViewDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/ViewDoctorAppointmentDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addDoctorAppointmentDetails" element={<AddDoctorAppointmentDetails />} />
        <Route path="/myAppointmentScreen" element={<MyAppointmentScreen />} />
        <Route path="/ophthalmologistsScreen" element={<OphthalmologistsScreen />} />
        <Route path="/patientDetailsForm" element={<PatientDetailsForm />} />
        <Route path="/updateDocotAppointmenteScreen" element={<UpdateDocotAppointmenteScreen />} />
        <Route path="/updateDoctorAppointmentDetails" element={<UpdateDoctorAppointmentDetails />} />
        <Route path="/viewDoctorAppointmentDetails" element={<ViewDoctorAppointmentDetails />} />

      </Routes>
    </BrowserRouter>
  );
}



export default App;
