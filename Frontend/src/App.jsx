import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";
import UserRegisterPage from "./pages/UserRegisterPage/UserRegister.jsx";

import AddDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/AddDoctorAppointmentDetails.jsx";
import AddPatientDetails from "./pages/HomePage/doctorappointment/PatientDetailsForm.jsx";
import DoctorProfileFrom from "./pages/DoctorManagement/DoctorProfileFrom.jsx";
import DoctorProfileTable from "./pages/DoctorManagement/DoctorProfileTable.jsx";
import OphthalmologistsScreen from "./pages/HomePage/doctorappointment/OphthalmologistsScreen.jsx";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/Register" element={<UserRegisterPage />} />

        <Route
          path="/addappointment"
          element={<AddDoctorAppointmentDetails />}
        />
        <Route path="/addpatient" element={<AddPatientDetails />} />

        <Route path="/doctorprofile" element={<DoctorProfileFrom />} />
        <Route path="/doctorprofiletable" element={<DoctorProfileTable />} />
        

       

        <Route path="/ophthalmologists" element={<OphthalmologistsScreen />} />

        

   


      </Routes>
    </BrowserRouter>
  );
}

export default App;
