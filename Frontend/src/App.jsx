import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/HomePage/Hompage/Homepage.jsx";
import UserRegisterPage from "./pages/UserRegisterPage/UserRegister.jsx";

import AddDoctorAppointmentDetails from "./pages/HomePage/doctorappointment/AddDoctorAppointmentDetails.jsx";
import MyAppointmentScreen from "./pages/HomePage/doctorappointment/MyAppointmentScreen.jsx";
import OphthalmologistsScreen from "./pages/HomePage/doctorappointment/OphthalmologistsScreen.jsx";
import PatientDetailsForm from "./pages/HomePage/doctorappointment/PatientDetailsForm.jsx";
import PatientList from "./pages/HomePage/doctorappointment/PatientList.jsx"; // Import PatientList
import EditPatient from "./pages/HomePage/doctorappointment/EditPatient.jsx"; // Import EditPatient

import DoctorProfileFrom from "./pages/DoctorManagement/DoctorProfileFrom.jsx";
import DoctorProfileTable from "./pages/DoctorManagement/DoctorProfileTable.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Register" element={<UserRegisterPage />} />

        <Route path="/addappointment" element={<AddDoctorAppointmentDetails />}/>
        <Route path="/patientdetails" element={<PatientDetailsForm />} />
        <Route path="/myappointment" element={<MyAppointmentScreen />} />
        <Route path="/ophthalmologists" element={<OphthalmologistsScreen />} />
        <Route path="/patientlist" element={<PatientList />} /> {/* Add route for PatientList */}
        <Route path="/editPatient/:id" element={<EditPatient />} /> {/* Add route for EditPatient */}

        <Route path="/doctorprofiletable" element={<DoctorProfileTable />} />
        <Route path="/doctorprofile" element={<DoctorProfileFrom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
