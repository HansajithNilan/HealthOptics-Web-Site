import React from "react";
import "./Ophthalmologists.css";
import eye1 from "/src/assets/eye1.jpg";
import eye from "/src/assets/eye.jpg";

import NavBar from "../../../components/NavBar/NavBar"; // Adjust path as necessary

export default function OphthalmologistsScreen() {
  return (
    <div>
      <NavBar />

      {/* Content below NavBar */}
      <div style={{ paddingTop: '70px' }}> {/* Additional padding to offset the fixed NavBar */}
        {/* Hero Section */}
        <div className="hero-section">
          <img src={eye} alt="close-up of a blue eye" className="eye" />
          <div className="hero-content">
            <h1 className="mainfont">
              Take Control Of<br />
              Your Eye Health<br />
              With Us.
            </h1>
            <p className="eyefont">
              Your Vision Matters,<br />
              Book an Appointment Now.
            </p>
          </div>
        </div>
        
        {/* Expert Eye Care Section */}
        <div className="background11">
          <div className="OpthTable_12">
            <div className="content-left1">
              <h2>Experience Expert Eye Care Channelling Online</h2>
              <p>
                "welcome to our eye care doctor channelling service! We understand 
                the importance of your vision and are here to help you schedule 
                appointments with our experienced eye care specialists. Take the 
                first step towards clearer vision and better eye health by booking 
                your appointment today."
              </p>
            </div>
            <div className="content-right">
              <img src={eye1} alt="Eye examination" className="img-fluid" />
            </div>
          </div>
          
          {/* Clinic Hours Section */}
          <div className="table_71">
            <div className="table_7col_1">
              <strong style={{ fontSize: "28px" }}>Get your Eyes Checked At Our Clinic</strong>
              <br />
              <span style={{ fontSize: "22px", display: "block", marginTop: "10px" }}>
                Sunday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Wednesday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Friday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4:00PM
              </span>
            </div>
          </div>
          
          {/* Doctor Search Section */}
          <div className="Opthtable_3">
            <div className="doctsearch">
              <span className="barname2">Doctor Name</span>
              <input 
                className="doctorSearch"
                type="search"
                placeholder="Search Doc Name."
                aria-label="Search"
              />
            </div>
            <div className="rating">
              <span className="type">Specialty</span>
              <select className="TypeSelect">
                <option value="all">All</option>
                <option value="Eye surgeon">Eye Surgeon</option>
                <option value="General surgeon">General Surgeon</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
