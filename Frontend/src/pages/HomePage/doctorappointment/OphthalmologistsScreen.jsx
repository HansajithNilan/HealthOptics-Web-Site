import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Ophthalmologists.css";
import eye1 from "/src/assets/eye1.jpg";
import eye from "/src/assets/eye.jpg";
import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/footer";

export default function OphthalmologistsScreen() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const timetableData = [
    {
      time: "09:00 AM - 10:00 AM",
      days: [
        { day: "Monday", event: null },
        { day: "Tuesday", event: { clinic: "Optometrist Clinic" } },
        { day: "Wednesday", event: null },
        { day: "Thursday", event: null },
        { day: "Friday", event: { clinic: "Eye Surgeon Clinic" } },
        { day: "Saturday", event: null },
        { day: "Sunday", event: { clinic: "Optical Properties" } },
      ],
    },
    {
      time: "04:00 PM - 06:00 PM",
      days: [
        { day: "Monday", event: { clinic: "Eye Surgeon Clinic" } },
        { day: "Tuesday", event: null },
        { day: "Wednesday", event: null },
        { day: "Thursday", event: { clinic: "Optometrist Clinic" } },
        { day: "Friday", event: null },
        { day: "Saturday", event: null },
        { day: "Sunday", event: { clinic: "Optical Properties" } },
      ],
    },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.firstName.toLowerCase().includes(search.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="ophthalmologists-container">
      <NavBar />

      <div className="content-wrapper">
        {/* Hero Section */}
        <div className="hero-section">
          <img src={eye} alt="Close-up of a blue eye" className="hero-image" data-aos="fade-right" />
          <div className="hero-content">
            <h1>
              Take Control of<br />Your Eye Health
            </h1>
            <p>Your vision matters book an appointment today.</p>
          </div>
        </div>

        {/* Expert Eye Care Section */}
        <div className="expert-section">
          <div className="expert-content">
            <div className="expert-text">
              <h2>Our experts rely on the finest optometry technology
              </h2>
              <p>
                Welcome to our eye care service! We prioritize your vision and connect you with experienced specialists. Book your appointment now for better eye health.
              </p>
            </div>
            <div className="expert-image">
              <img src={eye1} alt="Eye examination" data-aos="fade-right" />
            </div>
          </div>
        </div>

        {/* Doctor Search Section */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-group">
              <label>Doctor Name</label>
              <input
                type="search"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="specialty-group">
              <label>Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Eye Surgeon">Eye Surgeon</option>
                <option value="Optometrist">Optometrist</option>
              </select>
            </div>
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="doctor-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="doctor-card">
                <div className="doctor-image">
                  {doctor.photo ? (
                    <img
                      src={`http://localhost:3000/uploads/${doctor.photo}`}
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                      onError={(e) => (e.target.src = "placeholder-image-url")}
                    />
                  ) : (
                    <div className="no-photo">No Photo</div>
                  )}
                </div>
                <div className="doctor-info">
                  <h3>{`${doctor.firstName} ${doctor.lastName}`}</h3>
                  <p><strong>Specialty:</strong> {doctor.specialty}</p>
                  <p><strong>Location:</strong> {doctor.city}, {doctor.state}</p>
                  <p><strong>Email:</strong> {doctor.email}</p>
                  <Link
                    to={{ pathname: "/addappointment" }}
                    state={{ doctor }}
                  >
                    <button className="appointment-btn">Book Appointment</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No doctors found matching your criteria.</p>
          )}
        </div>

        {/* Timetable Section */}
        <div className="timetable-section">
          <h2>Doctors Timetable</h2>
          <p>Check availability and schedule your visit with our specialists.</p>
          <div className="timetable">
            <div className="timetable-header">
              <div className="time-slot"></div>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day) => (
                  <div key={day} className="day">
                    {day}
                  </div>
                )
              )}
            </div>
            {timetableData.map((slot, index) => (
              <div key={index} className="timetable-row">
                <div className="time-slot">{slot.time}</div>
                {slot.days.map((day, dayIndex) => (
                  <div key={dayIndex} className="event">
                    {day.event ? (
                      <span className="clinic">{day.event.clinic}</span>
                    ) : (
                      <span className="no-event">-</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}