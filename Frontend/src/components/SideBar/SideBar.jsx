import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import "./SideBar.css";

function SideBar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const toggleSubmenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const mainLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    {
      name: "Spectacles Management",
      path: "/admin/spectacles",
      // submenu: [
      //   { name: "Manage Spectacle Stock", path: "/admin/spectacles/stock" },
      //   { name: "View Spectacle Details", path: "/admin/spectacles/details" },
      // ],
    },
    {
      name: "Doctor Management",
      path: "/admin/doctor",
      submenu: [
        { name: "Manage Doctors", path: "/admin/doctor/manage" },
        { name: "View Doctor Details", path: "/admin/doctor/details" },
      ],
    },
    {
      name: "Reservations Management",
      path: "/admin/reservations",
      // submenu: [
      //   { name: "View Reservations", path: "/admin/reservations/view" },
      //   { name: "Manage Appointments", path: "/admin/reservations/manage" },
      // ],
    },
    // { name: "Logout", path: "/logout" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          src="../../../public/Website_logo.png"
          alt="Health Optics Logo"
          className="logo-img"
        />
        <h1 className="logo">Health Optics</h1>
      </div>

      <ul className="sidebar-links">
        {mainLinks.map((item, index) => (
          <li key={index}>
            <div
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <Link to={item.path} className="main-link">
                {item.name}
              </Link>
              {item.submenu && (
                <button
                  className="submenu-toggle"
                  onClick={() => toggleSubmenu(item.name)}
                >
                  <FaChevronDown />
                </button>
              )}
            </div>

            {activeMenu === item.name && (
              <ul className="submenu">
                {item.submenu.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      to={sub.path}
                      className={`submenu-link ${
                        location.pathname === sub.path ? "active" : ""
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
