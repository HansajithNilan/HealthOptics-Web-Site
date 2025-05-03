import React, { useContext, useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar.jsx";
import "./DashboardLayout.css";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
const DashboardLayout = ({ title, children }) => {

  const navigate = useNavigate();
  const {name,logout} = useContext(AuthContext);
  const userName = name.split(" ")[0]; // Get the first name from the full name
  
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(()=>{
    const handleClickOutside = (event) =>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[])

  const handleLogout = () => {
    logout(); // your context logout function
    navigate("/loginpage");
  };


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
              <span className="profile-name"> {userName}</span>
            </div>
            <div className="logout-dropdown-container" ref={dropdownRef}>
              <button
                className="logout-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Logout
              </button> 
              {dropdownOpen && (
                <div className="logout-dropdown-menu">
                  <span onClick={handleLogout}>Confirm Logout</span>
                  <span onClick={() => navigate("/")}>Home</span>
                </div>
              )}
            </div>
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