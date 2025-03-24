import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";
import UserRegisterPage from "./pages/UserRegisterPage/UserRegister.jsx";

import AddDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/AddDoctorAppointmentDetails.jsx";
import MyAppointmentScreen from "./pages/HomePage/doctorappointment/MyAppointmentScreen.jsx";
import OphthalmologistsScreen from "./pages/HomePage/doctorappointment/OphthalmologistsScreen.jsx";
import EditDoctorAppointment from "./pages/HomePage/doctorappointment/EditDoctorAppointment.jsx"; // Import EditDoctorAppointment

import DoctorProfileFrom from "./pages/DoctorManagement/DoctorProfileFrom.jsx";
import DoctorProfileTable from "./pages/DoctorManagement/DoctorProfileTable.jsx";

import Dashboard from "./pages/AdminPage/Dashboard/Dashboard.jsx";
import SpectacleManage from "./pages/AdminPage/SpectacleManagement/SpectacleManage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Register" element={<UserRegisterPage />} />

        <Route path="/doctorprofile" element={<DoctorProfileFrom />} />
        <Route path="/doctorprofiletable" element={<DoctorProfileTable />} />
      
        <Route path="/addappointment" element={<AddDoctorAppointmentDetails />} />
        <Route path="/ophthalmologists" element={<OphthalmologistsScreen />} />
        <Route path="/myappointment" element={<MyAppointmentScreen />} />
        <Route path="/editdoctorappointment/:id" element={<EditDoctorAppointment />} /> {/* Add route for EditDoctorAppointment */}
   
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/spectacles" element={<SpectacleManage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
