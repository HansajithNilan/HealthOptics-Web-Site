import React, { useState } from "react";
import axios from "axios";
import "./DoctorAppointmentDetails.css";
import m from "../../../assets/m.jpg"; // Ensure these paths are correct
import m1 from "../../../assets/m1.jpg";
import NavBar from "../../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/footer.jsx";
import Swal from "sweetalert2";

function AddDoctorAppointmentDetails() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    age: "",
    email: "",
    contact: "",
    address: "",
    date: "",
    consent: false,
  });
  const [isSubmitting, setSubmitting] = useState(false); // State to manage submission status
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
      const response = await axios.post(
        "http://localhost:5000/api/doctorappointment/createdoctorappointment",
        formData
      );
      Swal.fire("Thank you!", "Your Appointment Successfully", "success").then(
        (result) => {
          navigate("/myappointment");
        }
      );

      console.error("There was an error booking the appointment!", error);
      alert(
        `Failed to book appointment. Error: ${
          error.response ? error.response.data.message : "Server error"
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="appimg">
        <img src={m} alt="apimg" className="m" />
      </div>
      <div className="appimg1">
        <img src={m1} alt="apimg" className="m1" />
      </div>
      <div className="bookuappointment">
        <label className="text11">Book Your Appointment</label>
      </div>
      <h1 className="welcome" data-aos="fade-right">
        <strong>
          We Secure Your
          <br />
          Eye With Quality
          <br />
          Glasses
        </strong>
      </h1>

      <div
        style={{
         textAlign: "justify",
          // width: "700px",
          fontSize: "14px",
        }}
      >
        <p className="welcome_2" data-aos="fade-left">
          As per your wish, you can buy our quality products at the lowest<br />
          price. We offer a wide range of products from the most<br /> popular brands
          to the most expensive brands. 
        </p>
      </div>
      <div className="background-image-section">
        <form className="da-form-group" onSubmit={handleSubmit}>
          {/* Fields for user input */}
          <div className="mb-3">
            <label className="da-control-label">First Name</label>
            <input
              type="text"
              className="da-form-control"
              placeholder="Enter first name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="da-control-label">Last Name</label>
            <input
              type="text"
              className="da-form-control"
              placeholder="Enter last name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender selection */}
          <div className="mb-3">
            <label className="da-control-label">Gender</label>
            <div className="flex">
              <label htmlFor="maleRadio" className="EA1-control-label">
                Male
              </label>
              <input
                type="radio"
                id="maleRadio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />{" "}
              &nbsp; &nbsp;
              <label htmlFor="femaleRadio" className="EA1-control-label">
                Female
              </label>
              <input
                type="radio"
                id="femaleRadio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="da-control-label">Patient Age</label>
            <input
              type="number"
              className="da-form-control"
              placeholder="Enter age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="da-control-label">Email</label>
            <input
              type="email"
              className="da-form-control"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="da-control-label">Contact Number</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              pattern="[0-9]*"
              maxLength="10"
              minLength="10"
              className="da-form-control"
              placeholder="Enter contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="da-control-label">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter address"
              required
              className="da-form-control"
              style={{ height: "50px" }}
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="da-control-label">Appointment Date</label>
            <input
              type="date"
              className="da-form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <br />

          <div className="flex">
            <input
              type="checkbox"
              id="consent"
              className="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <label htmlFor="consent" className="EA11-control-label">
              &nbsp;I consent to the processing of my personal data in
              accordance with the Privacy Policy.
            </label>
          </div>

          <button type="submit" className="submit" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddDoctorAppointmentDetails;
