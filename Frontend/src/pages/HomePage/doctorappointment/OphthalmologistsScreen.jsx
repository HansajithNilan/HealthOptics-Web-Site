import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Ophthalmologists.css";
import eye1 from "/src/assets/eye1.jpg";
import eye from "/src/assets/eye.jpg";
import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar"; // Adjust path as necessary

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

      {/* Content below NavBar */}
      <div style={{ paddingTop: '70px' }}> {/* Additional padding to offset the fixed NavBar */}
        {/* Hero Section */}
        <div className="hero-section">
          <img src={eye} alt="close-up of a blue eye" className="eye" />
          <div className="hero-content">
            <h1 className="mainfont" data-aos="fade-up"><strong>
              Take Control Of<br />
              Your Eye Health<br />
              With Us.</strong>
            </h1>
            <p className="eyefont">
              Your Vision Matters,<br />
              Book an Appointment Now.
            </p>
            <Link to="/addappointment">
              <button className="book-appointment-btn">Book Appointment</button>
            </Link>
          </div>
        </div>
        
        {/* Expert Eye Care Section */}
        <div className="background11">
          <div className="OpthTable_12">
            <div className="content-left1" data-aos="fade-up">
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
              <img src={eye1} alt="Eye examination" className="img-fluid" data-aos="fade-right" />
            </div>
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
