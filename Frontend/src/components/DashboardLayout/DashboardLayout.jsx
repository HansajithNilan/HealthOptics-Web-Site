import React from "react";
import SideBar from "../../components/SideBar/SideBar.jsx";
import "./DashboardLayout.css";

const DashboardLayout = ({ title, children }) => {
  return (
    <div className="dashboard-layout-container">
      <SideBar />
      <div className="dashboard-layout-content">
        {/* Dashboard Header */}
        <div className="dashboard-layout-header">
          <h2 className="dashboard-title">{title}</h2>
          <div className="side-header">
            <div className="profile">
              <img
                src="/dp.jpg"
                alt="Profile"
                className="profile-picture"
              />
              <span className="profile-name">Admin</span>
            </div>
            <button className="logout-button">Logout</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;