import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';  // import Sidebar component
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-content">
        <h2>Welcome to the Admin Dashboard</h2>
      </div>
    </div>
  );
}

export default Dashboard;

