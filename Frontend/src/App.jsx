import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";

import UserRegisterPage from "./pages/UserRegisterPage/UserRegister.jsx";
import SpectaclesReservation from "./pages/SpectaclesReservationPage/Reservation.jsx";
import ReservationDetails from "./pages/SpectaclesReservationPage/ReservationDetails.jsx";
import ReservationUpdate from "./pages/SpectaclesReservationPage/UpdateReservation.jsx";


import AddDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/AddDoctorAppointmentDetails.jsx";
import AddPatientDetails from "./pages/HomePage/doctorappointment/PatientDetailsForm.jsx";
import DoctorProfileFrom from "./pages/DoctorManagement/DoctorProfileFrom.jsx";
import DoctorProfileTable from "./pages/DoctorManagement/DoctorProfileTable.jsx";
import DoctorProfilepage from "./pages/DoctorManagement/DoctorProfilepage.jsx";

import OphthalmologistsScreen from "./pages/HomePage/doctorappointment/OphthalmologistsScreen.jsx";



import Dashboard from "./pages/AdminPage/Dashboard/Dashboard.jsx";
import SpectacleManage from "./pages/AdminPage/SpectacleManagement/SpectacleManage.jsx";
import Spectacle from "./pages/HomePage/Spectacle/Spectacles.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/Register" element={<UserRegisterPage />} />
        <Route path="/reservespectacles/:id" element={<SpectaclesReservation />} />
        <Route path="/reservationDetails" element={<ReservationDetails />} />
        <Route path="/updatereservation/:id" element={<ReservationUpdate/>} />

        
        <Route path="/addappointment" element={<AddDoctorAppointmentDetails />} />
        <Route path="/addpatient" element={<AddPatientDetails />} />


        <Route path="/doctorprofile" element={<DoctorProfileFrom />} />
        <Route path="/doctorprofiletable" element={<DoctorProfileTable />} />
        <Route path="/doctorprofilepage/" element={<DoctorProfilepage />} />
        

       

        <Route path="/ophthalmologists" element={<OphthalmologistsScreen />} />

        
   
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/spectacles" element={<SpectacleManage />} />
        <Route path="/spectacles" element={<Spectacle/>}/>

      </Routes>
    </BrowserRouter>
  );
}



export default App;
