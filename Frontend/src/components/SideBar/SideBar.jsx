import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./SideBar.css";

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <img src="../../../public/Website_logo.png"/>
        <h1 className="logo">Health Optics</h1>
        {/* <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button> */}
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/spectacles">Spectacles Managment</Link>
        </li>
        <li>
          <Link to="/admin/doctor">Doctor Managment</Link>
        </li>
        <li>
          <Link to="/admin/reservations">Reservations Managment</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
