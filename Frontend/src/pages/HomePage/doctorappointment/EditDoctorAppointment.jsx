import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/footer.jsx";
import m from "../../../assets/m.jpg";
import "./EditDoctorAppointment.css";
import Swal from "sweetalert2";

function EditDoctorAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    age: "",
    email: "",
    contact: "",
    address: "",
    date: "",
    timeSlot: "",
    consent: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/doctorappointment/getdoctorappointment/${id}`
        );
        setFormData(response.data.doctorAppointment);
      } catch (error) {
        console.error("Error fetching appointment:", error);
        Swal.fire({
          title: "Error",
          text: "Unable to fetch appointment details.",
          icon: "error",
          confirmButtonColor: "#e53e3e",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/doctorappointment/editdoctorappointment/${id}`,
        formData
      );
      Swal.fire({
        title: "Updated!",
        text: "Your appointment has been updated successfully.",
        icon: "success",
        confirmButtonColor: "#2c5282",
      }).then(() => navigate("/OnMyAppointment"));
    } catch (error) {
      console.error("Error updating appointment:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update appointment.",
        icon: "error",
        confirmButtonColor: "#e53e3e",
      });
    }
  };

  if (isLoading) {
    return <div className="loading">Loading appointment details...</div>;
  }

  return (
    <div className="edit-appointment-container">
      <NavBar />
      <div className="hero-section">
        <img src={m} alt="Doctor" className="hero-image" />
        <div className="hero-text">
          <h1>Edit Your Appointment</h1>
          <p>Update your details with ease.</p>
        </div>
      </div>

      <div className="edit-form-container">
        <form className="edit-appointment-form" onSubmit={handleSubmit}>
          <h2>Update Appointment Details</h2>

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
          </div>

          <div className="consent-group">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <label>I consent to the processing of my data per the Privacy Policy.</label>
          </div>

          <button type="submit">Update Appointment</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditDoctorAppointment;