import React from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import "./Dashboard.css"; // Ensure your CSS file is linked correctly

// Example of a simple component for stats
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
    <DashboardLayout title="Dashboard">

      <div className="dashboardvihani">
        <StatCard color="blue" title="Department" count="26" icon="🏥" />
        <StatCard color="green" title="Doctor" count="20" icon="👨‍⚕️" />
        <StatCard color="yellow" title="Patient" count="350" icon="👤" />
        <StatCard color="red" title="Patient Appointment" count="36" icon="📅" />
        <StatCard color="purple" title="Spectacles" count="112" icon="👓" /> {/* New Spectacles card */}
        {/* Add more components for charts and other data visualizations */}
      </div>

      {/* <h1>Hi</h1> */}

    </DashboardLayout>
  );
};

export default Dashboard;
