import React from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import "./Dashboard.css";
import { FaBuilding, FaUserMd, FaUsers, FaCalendarCheck, FaGlasses } from "react-icons/fa";

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
  return (
    <DashboardLayout title="Health Optics Dashboard">
      <div className="dashboardvihani">
        <StatCard 
          color="blue" 
          title="Departments" 
          count="26" 
          icon={<FaBuilding />}
        />
        <StatCard 
          color="green" 
          title="Doctors" 
          count="20" 
          icon={<FaUserMd />}
        />
        <StatCard 
          color="yellow" 
          title="Patients" 
          count="350" 
          icon={<FaUsers />}
        />
        <StatCard 
          color="red" 
          title="Appointments" 
          count="36" 
          icon={<FaCalendarCheck />}
        />
        <StatCard 
          color="purple" 
          title="Spectacles" 
          count="112" 
          icon={<FaGlasses />}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;