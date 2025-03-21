import React from "react";
import "./DoctorAppointmentDetails.css";
import NavBar from "../../../components/NavBar/NavBar";
import "../../../components/NavBar/NavBar.css";

function AddDoctorAppointmentDetails() {
  return (
    <div>
      <NavBar />
      <form className="da-form-group">
        <h2>Doctor Appointment</h2>
        <br />
        <div className="mb-3">
          <label className="da-control-label">Patient Name</label>
          <br />
          <input
            type="text"              
            className="da-form-control"
            placeholder="Enter customer name "
            required
          />
        </div>
        <br />
        <div className="mb-3">
          <label className="da-control-label">Contact</label>
          <br />
          <input
            type="tel"
            id="contactNumber"
            pattern="[0-9]*"
            maxLength="10"
            minLength="10"
            className="da-form-control"
            placeholder="Enter contact"
            required
          />
          <br />
          <div className="mb-3">
            <label className="da-control-label">Address</label>
            <br />
            <textarea id="address" name="address" required style={{ width: "530px", height: "80px" }}   
            ></textarea>
          </div>
          <br />
        </div>
        <div className="mb-3">
          <label className="da-control-label"> Patient Age</label>
          <br />
          <input
            type="number"
            className="da-form-control"
            placeholder="Enter age"
            required
          />
        </div>
        <br />

        <div className="mb-3">
          <label className="da-control-label">Doctor Name </label>
          <br />
          <input
            type="text"
            className="da-form-control"
            placeholder="Enter doctor name"
            required
          />
        </div>
        <br />

        <div className="mb-3">
          <label className="da-control-label"> Appointment Date</label>
          <br />
          <input
            type="date"
            className="da-form-control"
            placeholder="Enter Date "
            required
          />
        </div>

        <div className="mb-3">
          <label className="da-control-label">Doctor Fee</label>
          <br />
          <input
            type="number"
            className="da-form-control"
            placeholder="Enter doctor fee"
            required
          />
        </div>
        <br />

        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddDoctorAppointmentDetails;
