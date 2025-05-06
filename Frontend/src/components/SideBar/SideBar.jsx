import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaUserMd, FaComments, FaCalendarAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiSunglasses } from "react-icons/gi";
import { BsCalendarCheck } from "react-icons/bs";
import "./SideBar.css";

function SideBar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const toggleSubmenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const mainLinks = [
    { 
      name: "Dashboard", 
      path: "/admin/dashboard",
      icon: <MdDashboard className="sidebar-icon" />
    },
    {
      name: "Spectacles Management",
      path: "/admin/spectacles",
      icon: <GiSunglasses className="sidebar-icon" />
    },
    {
      name: "Doctor Management",
      path: "/admin/doctors",
      icon: <FaUserMd className="sidebar-icon" />
    },
    {
      name: "Reservations Management",
      path: "/reservationDetails",
      icon: <FaCalendarAlt className="sidebar-icon" />
    },
    {
      name: "Feedback Management",
      path: "/admin/feedbacks",
      icon: <FaComments className="sidebar-icon" />
    },
    {
      name:"Appointment Management",
      path:"/allappoiment",
      icon:<BsCalendarCheck className="sidebar-icon" />,
      

    }
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
                {item.icon}
                <span>{item.name}</span>
              </Link>
              {item.submenu && (
                <button
                  className="submenu-toggle"
                  onClick={() => toggleSubmenu(item.name)}
                >
                  <FaChevronDown className={`chevron ${activeMenu === item.name ? 'rotated' : ''}`} />
                </button>
              )}
            </div>

            {activeMenu === item.name && item.submenu && (
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