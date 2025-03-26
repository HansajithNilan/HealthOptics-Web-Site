import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Ophthalmologists.css";
import eye1 from "/src/assets/eye1.jpg";
import eye from "/src/assets/eye.jpg";

import NavBar from "../../../components/NavBar/NavBar";

export default function OphthalmologistsScreen() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data); // Fetch and set doctor details
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.firstName.toLowerCase().includes(search.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      
      {/* Hero Section */}
      <div className="hero-section">
        <img src="/src/assets/eye.jpg" alt="close-up of blue eye" className="eye" />
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
      <div className="background">
        <div className="OpthTable_1">
          <div className="content-left">
            <h2>Experience Expert Eye Care Channelling Online</h2>
            <p>
              "Welcome to our eye care doctor channelling service! We understand 
              the importance of your vision and are here to help you schedule 
              appointments with our experienced eye care specialists. Take the 
              first step towards clearer vision and better eye health by booking 
              your appointment today."
            </p>
          </div>
          <div className="content-right">
            <img src="/src/assets/eye1.jpg" alt="Eye examination" className="img-fluid" />
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <div className="doctor-image">
              {doctor.photo ? (
                <img
                  src={`http://localhost:5000/uploads/${doctor.photo}`}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                />
              ) : (
                <div className="no-photo">No Photo</div>
              )}
            </div>
            <div className="doctor-info">
              <h3>{`${doctor.firstName} ${doctor.lastName}`}</h3>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>City:</strong> {doctor.city}</p>
              <p><strong>State:</strong> {doctor.state}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <div className="doctor-actions">
              
                <button className="appointment-btn">Appointment</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}