import React, { useState } from "react";
import axios from "axios";
import "./DoctorAppointmentDetails.css";
import facebook from "../../../assets/facebook.png";
import instagram from "../../../assets/instagram.png";
import twitter from "../../../assets/twitter.png";
import linkedin from "../../../assets/linkedin.png";
import m1 from "../../../assets/m1.jpg";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../../components/Footer/footer.jsx";
import Swal from "sweetalert2";

function AddDoctorAppointmentDetails() {
  const location = useLocation();
  const doctor = location.state?.doctor;
  const user = JSON.parse(localStorage.getItem("currentUser")); // Get user from localStorage

  if (!doctor) {
    return (
      <p className="error-message">Doctor details not available. Please go back and select a doctor.</p>
    );
  }

  const [formData, setFormData] = useState({
    firstname: user?.name?.split(' ')[0] || "", // Auto-fill first name from user's name
    lastname: "",
    gender: "",
    age: "",
    email: user?.email || "", // Auto-fill email from localStorage
    contact: "",
    address: "",
    date: "",
    doctor: `${doctor.firstName} ${doctor.lastName}`,
    consent: false,
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(
        "http://localhost:5000/api/doctorappointment/createdoctorappointment",
        formData
      );
      Swal.fire({
        title: "Thank You!",
        text: "Your appointment has been booked successfully.",
        icon: "success",
        confirmButtonColor: "#2c5282",
      }).then(() => navigate("/myappointment"));
    } catch (error) {
      console.error("Error booking appointment:", error);
      Swal.fire({
        title: "Error",
        text: `Failed to book appointment: ${error.response?.data.message || "Server error"}`,
        icon: "error",
        confirmButtonColor: "#e53e3e",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="appointment-container">
      <NavBar />
      <div className="hero-section">
        <img src={m1} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1>We Secure Your Eyes<br />With Quality Care</h1>
          <p  style={{color:"#2A2F41"}}>Book an appointment with our expert doctors for top-notch service.</p>
        </div>
      </div>

      <div className="appointment-content">
        <div className="doctor-details-card">
          <h3>Doctor Information</h3>
          <div className="doctor-photo">
            {doctor.photo ? (
              <img
                src={`http://localhost:5000/uploads/${doctor.photo}`}
                alt={`${doctor.firstName} ${doctor.lastName}`}
                onError={(e) => (e.target.src = "placeholder-image-url")}
              />
            ) : (
              <div className="no-photo">No Photo Available</div>
            )}
          </div>
          <div className="doctor-info">
            <p><strong>Name:</strong> {doctor.firstName} {doctor.lastName}</p>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Location:</strong> {doctor.city}, {doctor.state}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Contact n:</strong> {doctor.phone}</p>
          </div>
        </div>

        <form className="appointment-form" onSubmit={handleSubmit}>
          <h2>Book Your Appointment</h2>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  required
                />
                Female
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                pattern="[0-9]{10}"
                placeholder="Enter 10-digit number"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-group">
            <label>Appointment Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} // Disable past dates
              required
            />
          </div>

          <div className="consent-group">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <label>I agree to the processing of my data per the Privacy Policy.</label>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>

      <div className="contact-section">
        <div className="contact-details">
          <p><span>📞</span> <a href="tel:+94771234567">+94 77 123 4567</a></p>
          <p><span>📧</span> <a href="mailto:helthoptics@gmail.com">helthoptics@gmail.com</a></p>
        </div>
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddDoctorAppointmentDetails;