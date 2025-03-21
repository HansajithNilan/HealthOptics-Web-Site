import React from "react";
import { Link } from "react-router-dom";

function SideBar(){
    return(
        <div className="navbar">
        <div className="side-bar-logo">
          <h1>Admin Panel</h1>
        </div>
        <ul className="side-bar-links">
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/spectacles">Manage Spectacles</Link>
          </li>
          <li>
            <Link to="/admin/orders">Manage Orders</Link>
          </li>
          <li>
            <Link to="/admin/customers">Manage Customers</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link> {/* You can replace it with actual logout functionality later */}
          </li>
        </ul>
      </div>
    );
}

export default SideBar;