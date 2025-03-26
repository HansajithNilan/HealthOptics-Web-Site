import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import "../../../components/NavBar/NavBar.css";
import m from "../../../assets/m.jpg";
import Footer from '../../../components/Footer/footer.jsx'
import "./EditDoctorAppointment.css";
import Swal from 'sweetalert2';

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
    consent: false,
  });

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctorappointment/getdoctorappointment/${id}`);
        const appointment = response.data.doctorAppointment;
        setFormData(appointment);
      } catch (error) {
        console.error("There was an error fetching the appointment!", error);
      }
    }
    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/doctorappointment/editdoctorappointment/${id}`, formData);
      console.log(response.data);
      Swal.fire('Updated', "Your Appointment is updated successfully", "success").then(result => {
  
        navigate("/myappointment");

   });
      
    } catch (error) {
      console.error("There was an error updating the appointment!", error);
      Swal.fire('Error', "Error with updating user", "error");
    }
  };

  return (
    <div >

      <NavBar />
      <img src={m} alt="doctor" className="EA-m" />
      <form className="EA-form-group" onSubmit={handleSubmit}>
        <div className="EA-mb-3">
          <label className="EA-control-label">First Name</label>
          <input
            type="text"
            className="EA-form-control"
            placeholder="Enter first name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="EA-mb-3">
          <label className="EA-control-label">Last Name</label>
          <input
            type="text"
            className="EA-form-control"
            placeholder="Enter last name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="EA-mb-3">
          <label className="EA-control-label">Gender</label>
          <div className="flex">
            <label className="EA1-control-label" htmlFor="maleRadio">Male</label>
            <input
              type="radio"
              id="maleRadio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            /> &nbsp; &nbsp;
            <label className="EA1-control-label" htmlFor="femaleRadio">Female</label>
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
        <br />

        <div className="EA-mb-3">
          <label className="EA-control-label">Patient Age</label>
          <input
            type="number"
            className="EA-form-control"
            placeholder="Enter age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="EA-mb-3">
          <label className="EA-control-label">Email</label>
          <input
            type="email"
            className="EA-form-control"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="EA-mb-3">
          <label className="EA-control-label">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            pattern="[0-9]*"
            maxLength="10"
            minLength="10"
            className="EA-form-control"
            placeholder="Enter contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="EA-mb-3">
          <label className="EA-control-label">Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter address"
            required
            className="EA-form-control"
            style={{ height: "50px" }}
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="EA-mb-3">
          <label className="EA-control-label">Appointment Date</label>
          <input
            type="date"
            className="EA-form-control"
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
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          <label className="EA1-control-label">
            &nbsp;&nbsp;&nbsp;I consent to the processing of my personal data
            in accordance with the Privacy Policy.
          </label>
        </div>
        <br />
        <br />
        <button type="submit" className="EA-submit">
          Update Appointment
        </button>
      </form>
      <Footer/>
    </div>
  );
}

export default EditDoctorAppointment;
