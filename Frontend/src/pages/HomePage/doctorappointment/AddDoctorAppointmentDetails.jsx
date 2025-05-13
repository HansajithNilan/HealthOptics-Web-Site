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
    timeSlot: "",
    doctor: `${doctor.firstName} ${doctor.lastName}`,
    consent: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    const today = new Date().toISOString().split('T')[0];

    if (!nameRegex.test(formData.firstname)) {
      errors.firstname = "First name should be 2-30 characters long and contain only letters";
    }
    if (!nameRegex.test(formData.lastname)) {
      errors.lastname = "Last name should be 2-30 characters long and contain only letters";
    }
    if (!formData.gender) {
      errors.gender = "Please select your gender";
    }
    if (!formData.age || formData.age < 1 || formData.age >= 100) {
      errors.age = "Age must be between 1 and 99";  
    }
    if (!phoneRegex.test(formData.contact)) {
      errors.contact = "Please enter a valid 10-digit phone number";
    }
    if (!formData.address || formData.address.length < 5) {
      errors.address = "Address must be at least 5 characters long";
    }
    if (!formData.date) {
      errors.date = "Please select an appointment date";
    } else if (formData.date < today) {
      errors.date = "Appointment date cannot be in the past";
    }
    if (!formData.timeSlot) {
      errors.timeSlot = "Please select an appointment time";
    }
    if (!formData.consent) {
      errors.consent = "You must agree to the privacy policy";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/doctorappointment/createdoctorappointment",
        formData
      );

      if (response.data) {
        Swal.fire({
          title: "Thank You!",
          text: "Your appointment has been booked successfully.",
          icon: "success",
          confirmButtonColor: "#2c5282",
        }).then(() => {
          navigate("/onmyappointment"); // Fix navigation path
        });
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      const errorMessage = error.response?.data?.message || "Server error";
      
      if (error.response?.status === 401) {
        Swal.fire({
          title: "Session Expired",
          text: "Please login again to continue",
          icon: "warning",
          confirmButtonColor: "#2c5282",
        }).then(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `Failed to book appointment: ${errorMessage}`,
          icon: "error",
          confirmButtonColor: "#e53e3e",
        });
      }
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
                src={`http://localhost:3000/uploads/${doctor.photo}`}
                alt={`${doctor.firstName} ${doctor.lastName}`}
                onError={(e) => (e.target.src = "placeholder-image-url")}
              />
            ) : (
              <div className="no-photo">No Photo Available</div>
            )}
          </div>
          <div className="doctor-info">
            <p><strong>Name: </strong> Dr.{doctor.firstName} {doctor.lastName}</p>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Location:</strong> {doctor.city}, {doctor.state}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Contact no:</strong> {doctor.phone}</p>
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
              {formErrors.firstname && <span className="error-message">{formErrors.firstname}</span>}
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
              {formErrors.lastname && <span className="error-message">{formErrors.lastname}</span>}
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
            {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
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
              {formErrors.age && <span className="error-message">{formErrors.age}</span>}
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
              {formErrors.contact && <span className="error-message">{formErrors.contact}</span>}
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
            {formErrors.address && <span className="error-message">{formErrors.address}</span>}
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
            {formErrors.date && <span className="error-message">{formErrors.date}</span>}
          </div>

          <div className="form-group">
            <label>Appointment Time</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select Time Slot</option>
              <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
              <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
            </select>
            {formErrors.timeSlot && <span className="error-message">{formErrors.timeSlot}</span>}
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
            {formErrors.consent && <span className="error-message">{formErrors.consent}</span>}
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