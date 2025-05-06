import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import "./Dashboard.css";
import { FaBuilding, FaUserMd, FaUsers, FaCalendarCheck, FaGlasses, FaCarAlt, FaShoppingBag, FaShoppingBasket, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../../components/Context/AuthContext.jsx";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";

const StatCard = ({ color, title, count, icon }) => (
  <div className={`cardvihani ${color}`}>
    <div className="iconvihani">{icon}</div>
    <div className="contentvihani">
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { name } = useContext(AuthContext);
  const userName = name?.split(" ")[0] || "User"; // Safety check for null

  const [ReservationCount, setReservationCount] = useState(0);
  const [DoctorCount, setDoctorCount] = useState(0);
  const [DepartmentCount, setDepartmentCount] = useState(0);
  const [PatientCount, setPatientCount] = useState(0);
  const [SpectacleCount, setSpectacleCount] = useState(0);
  const [AppointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/reservation/getallreservations")
      .then((response) => {
        console.log("Reservation data:", response.data);
        setReservationCount(response.data.length || 0);
      })
      .catch((error) => {
        console.error("Error fetching reservation count:", error);
      });
      axios.get("http://localhost:3000/api/doctorappointment/getallappointments")
      .then((response) => {
        const appointments = response.data.appointments;
        setAppointmentCount(appointments.length);
      })
      .catch((error) => {
        console.error("Error fetching reservation count:", error);
      });

   
    axios.get("http://localhost:3000/api/auth/doctor/")
      .then((response) => {
       setDoctorCount(response.data.length || 0);
    });
    // axios.get("http://localhost:3000/api/department/count")
    //   .then((response) => {
    //     setDepartmentCount(response.data.count);
    //   });
    // axios.get("http://localhost:3000/api/patient/count")
    //   .then((response) => {
    //     setPatientCount(response.data.count);
    //   });
    // axios.get("http://localhost:3000/api/spectacle/count")
    //   .then((response) => {
    //     setSpectacleCount(response.data.count);
    //   });
  }, []);

  return (
    <DashboardLayout title="Health Optics Dashboard">
      <div className="dashboardvihani">
        <StatCard color="blue" title="Departments" count="26" icon={<FaBuilding />} />
        <StatCard color="green" title="Doctors" count={DoctorCount} icon={<FaUserMd />} />
        <StatCard color="yellow" title="Patients" count="350" icon={<FaUsers />} />
        <StatCard color="red" title="Appointments" count={AppointmentCount} icon={<FaCalendarCheck />} />
        <StatCard color="purple" title="Spectacles" count="112" icon={<FaGlasses />} />
        <StatCard color="black" title="Reservation" count={ReservationCount} icon={<FaShoppingCart />} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
