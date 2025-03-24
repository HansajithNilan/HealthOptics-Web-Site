import React from "react";
import SideBar from "../../components/SideBar/SideBar.jsx";
import "./DashboardLayout.css";

const DashboardLayout = ({ title, children }) => {
  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-content">
        {/* Static Dashboard Header */}

        <div className="dashboard-header">
          <h2>{title}</h2>
          <div className="side-header">
          <div className="profile">
             <img src="/dp.jpg" alt="Profile" className="profile-picture"/>
              <span className="profile-name">Admin</span>
          </div>
          <button className="logout-button">Logout</button>
          </div>
        </div>


        {/* The children prop will render the page content */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
