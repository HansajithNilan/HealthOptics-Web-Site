import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import "../../../components/NavBar/NavBar.css";
import "./PatientDetailsForm.css";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    age: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    emergency: "",
  });

  useEffect(() => {
    async function fetchPatient() {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/patient/getPatients`);
        const patient = response.data.find((p) => p._id === id);
        setFormData(patient);
      } catch (error) {
        console.error("There was an error fetching the patient!", error);
      }
    }
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/patient/updatePatient/${id}`, formData);
      console.log(response.data);
      alert("Patient updated successfully!");
      navigate("/patientlist");
    } catch (error) {
      console.error("There was an error updating the patient!", error);
      alert("Failed to update patient. Please try again.");
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="full">
          <div class="fullform">
            <h2 className="heder">Edit Patient Details</h2>
            <label className="lb" htmlFor="fname">
              First Name
            </label>
            <input
              className="text1"
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
            <label className="lb" htmlFor="lname">
              Last Name
            </label>
            <input
              className="text1"
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
            <label className="lb" htmlFor="age">
              Age
            </label>
            <input
              className="text1"
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
              max="120"
            />
            <label className="lb" htmlFor="dob">
              Appointment Date
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <br />
            <label className="lb">Gender</label>
            <div style={{ display: "flex" }}>
              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                id="maleRadio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              &nbsp;&nbsp;
              <label className="form-check-label" htmlFor="maleRadio">
                Male
              </label>
              &nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                id="femaleRadio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
              &nbsp;&nbsp;
              <label className="form-check-label" htmlFor="femaleRadio">
                Female
              </label>
            </div>
            <br />
            <label className="lb" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="text1"
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label className="lb" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{ width: "580px", height: "100px" }}
            ></textarea>
            <br />
            <label className="lb" htmlFor="emergency">
              Emergency Contact Number
            </label>
            <input
              className="text1"
              type="tel"
              id="emergency"
              name="emergency"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              value={formData.emergency}
              onChange={handleChange}
              required
            />
            <br />
            <div style={{ display: "flex" }}>
              <input type="checkbox" id="consent" name="consent" required />
              <label
                className="lb"
                htmlFor="consent"
                style={{ fontSize: "13.5px" }}
              >
                &nbsp;&nbsp;&nbsp;I consent to the processing of my personal
                data in accordance with the Privacy Policy.
              </label>
            </div>
            <br />
            <button className="appointmentbtn" type="submit">
              Update Patient
            </button>
            <br />
            <br />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPatient;
