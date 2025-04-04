import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";
import UserRegisterPage from "./pages/UserRegisterPage/UserRegister.jsx";
import SpectaclesReservation from "./pages/SpectaclesReservationPage/Reservation.jsx";
import ReservationDetails from "./pages/SpectaclesReservationPage/ReservationDetails.jsx";
import ReservationUpdate from "./pages/SpectaclesReservationPage/UpdateReservation.jsx";
import Loginpage from "./pages/LoginPage/loginpage.jsx";
import ReservationDisplay from "./pages/UserReservation/ReservationDisplay.jsx";

import AddDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/AddDoctorAppointmentDetails.jsx";

import AllAppointmentScreen from "./pages/HomePage/doctorappointment/AllAppointmentScreen.jsx";

import DoctorProfileFrom from "./pages/DoctorManagement/DoctorProfileFrom.jsx";
import DoctorProfilepage from "./pages/DoctorManagement/DoctorProfilepage.jsx";

import EditDoctorProfile from "./pages/DoctorManagement/EditDoctorProfile";
import OphthalmologistsScreen from "./pages/HomePage/doctorappointment/OphthalmologistsScreen.jsx";
import Dashboard from "./pages/AdminPage/Dashboard/Dashboard.jsx";
import SpectacleManage from "./pages/AdminPage/SpectacleManagement/SpectacleManage.jsx";

// Import AdminDoctorManage component, make sure the path matches where the component is in your project.
import AdminDoctorManage from "./pages/AdminPage/DoctorManagement/AdminDoctorManage.jsx"; // Corrected path

import EditDoctorAppointment from "./pages/HomePage/doctorappointment/EditDoctorAppointment.jsx"; // Import EditDoctorAppointment

import DoctorProfileTable from "./pages/DoctorManagement/DoctorProfileTable.jsx";

import Spectacle from "./pages/HomePage/Spectacle/Spectacles.jsx";
import OnMyAppointment from "./pages/HomePage/doctorappointment/OnMyAppointment.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<UserRegisterPage />} />
      <Route path="/Register" element={<UserRegisterPage />} />
      <Route
        path="/reservespectacles/:id/:number"
        element={<SpectaclesReservation />}
      />
      <Route path="/reservationDetails" element={<ReservationDetails />} />
      <Route path="/updatereservation/:id" element={<ReservationUpdate />} />
      <Route
        path="/reservationdisplay/:number"
        element={<ReservationDisplay />}
      />
      <Route path="/ophthalmologists" element={<OphthalmologistsScreen />} />
      <Route path="/allappointments" element={<AllAppointmentScreen />} />
      <Route
        path="/editdoctorappointment/:id"
        element={<EditDoctorAppointment />}
      />{" "}
      {/* Add route for EditDoctorAppointment */}
      <Route path="/reservespectacles" element={<SpectaclesReservation />} />
      <Route path="/addappointment" element={<AddDoctorAppointmentDetails />} />
      <Route
        path="/doctorprofile"
        element={
          <DoctorProfileFrom
            onDoctorAdded={(doctor) => {
              const state = window.history.state;
              if (state && state.onDoctorAdded) {
                state.onDoctorAdded(doctor);
              }
            }}
          />
        }
      />
      <Route path="/doctorprofilepage" element={<DoctorProfilepage />} />
      <Route path="/editdoctor/:id" element={<EditDoctorProfile />} />
      <Route path="/ophthalmologists" element={<OphthalmologistsScreen />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/spectacles" element={<SpectacleManage />} />
      <Route path="/admin/doctors" element={<AdminDoctorManage />} />{" "}
      {/* New route for AdminDoctorManage */}
      <Route path="/doctorprofile" element={<DoctorProfileFrom />} />
      <Route path="/spectacles" element={<Spectacle />} />
      <Route path="/loginpage" element={<Loginpage />} />

      <Route path="/onmyappointment" element={<OnMyAppointment />} />
    </Routes>
  );
}

export default App;
