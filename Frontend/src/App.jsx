import React from "react";

import { Routes, Route } from "react-router-dom";





import "./App.css";

import About from "./pages/HomePage/About/about.jsx";
import Services from "./pages/HomePage/Services/Services.jsx";

import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";
import AllAppointmentScreen from "./pages/HomePage/doctorappointment/AllAppointmentScreen.jsx";
import AddfeedBackform from "./pages/HomePage/UserFeedback/Addfeedbackform.jsx";
import AllFeedbacks from './pages/HomePage/UserFeedback/AllFeedbacks.jsx';

import UserRegisterPage from "./pages/UserRegisterPage/UserRegister.jsx";

import SpectaclesReservation from "./pages/SpectaclesReservationPage/Reservation.jsx";

import ReservationDetails from "./pages/SpectaclesReservationPage/ReservationDetails.jsx";
import ReservationUpdate from "./pages/SpectaclesReservationPage/UpdateReservation.jsx";

import AddDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/AddDoctorAppointmentDetails.jsx";



import Loginpage from "./pages/LoginPage/loginpage.jsx";

import DoctorProfileFrom from "./pages/DoctorManagement/DoctorProfileFrom.jsx";
import DoctorProfilepage from "./pages/DoctorManagement/DoctorProfilepage.jsx";

import EditDoctorProfile from "./pages/DoctorManagement/EditDoctorProfile";
import OphthalmologistsScreen from "./pages/HomePage/doctorappointment/OphthalmologistsScreen.jsx";
import Dashboard from "./pages/AdminPage/Dashboard/Dashboard.jsx";
import SpectacleManage from "./pages/AdminPage/SpectacleManagement/SpectacleManage.jsx";

import AdminDoctorManage from "./pages/AdminPage/DoctorManagement/AdminDoctorManage.jsx";
import EditDoctorAppointment from "./pages/HomePage/doctorappointment/EditDoctorAppointment.jsx";
import DoctorProfileTable from "./pages/DoctorManagement/DoctorProfileTable.jsx";
import Spectacle from "./pages/HomePage/Spectacle/Spectacles.jsx";
import Cartab from "./pages/CartTab/cartab.jsx";
import AdminFeedbackManage from "./pages/AdminPage/FeedbackManagement/AdminFeedbackManage.jsx";
import ReservationDisplay from "./pages/UserReservation/ReservationDisplay.jsx";
import OnMyAppointment from "./pages/HomePage/doctorappointment/OnMyAppointment.jsx";
import ViewAllDoctor from "./pages/AdminPage/DoctorManagement/ViewAllDoctor.jsx";
import CustomReport from "./components/Report/CustomReport.jsx";


import TrySpectacles from "./pages/HomePage/Spectacle/TrySpectacles.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/feedback" element={<AddfeedBackform />} />
      <Route path="/all-feedbacks" element={<AllFeedbacks />} />
      <Route path="/onmyappointment" element={<OnMyAppointment />} />
      <Route path="/about" element={<About />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/services" element={<Services />} />
      

      <Route path="/register" element={<UserRegisterPage />} />
      
      <Route path="/reservespectacles/:id/:number" element={<SpectaclesReservation />} />
      <Route path="/reservationDetails" element={<ReservationDetails />} />
      <Route path="/updatereservation/:id" element={<ReservationUpdate/>} />
      <Route path="/ophthalmologists" element={<OphthalmologistsScreen />} />
      <Route path="/myappointment" element={<OnMyAppointment />} />
      <Route path="/editdoctorappointment/:id" element={<EditDoctorAppointment />} />
      <Route path="/reservespectacles" element={<SpectaclesReservation />} />
      <Route path="/reservationdisplay/:number" element={<ReservationDisplay />} />
      <Route path="/addappointment" element={<AddDoctorAppointmentDetails />} />
      <Route path="/doctorprofile" element={
        <DoctorProfileFrom onDoctorAdded={(doctor) => {
          const state = window.history.state;
          if (state && state.onDoctorAdded) {
            state.onDoctorAdded(doctor);
          }
        }} />
      } />
      <Route path="/doctorprofilepage" element={<DoctorProfilepage />} />
      <Route path="/editdoctor/:id" element={<EditDoctorProfile />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/allappoiment" element={<AllAppointmentScreen />} />
      <Route path="/admin/spectacles" element={<SpectacleManage />} />
      <Route path="/admin/doctors" element={<AdminDoctorManage />} />
      <Route path="/admin/doctors/all" element={<ViewAllDoctor />} />
      <Route path="/admin/doctors/report" element={<CustomReport />} />
      <Route path="/doctorprofiletable" element={<DoctorProfileTable />} />
      <Route path="/spectacles" element={<Spectacle />} />
      <Route path="/loginpage" element={<Loginpage/>} />
      <Route path="/admin/feedbacks" element={<AdminFeedbackManage />} />

      <Route path="/tryspectacles/:id" element={<TrySpectacles />} />

     
    </Routes>

  );
}

export default App;
