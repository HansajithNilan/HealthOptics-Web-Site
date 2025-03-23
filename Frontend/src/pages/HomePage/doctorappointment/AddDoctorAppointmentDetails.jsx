import React from "react";
import "./DoctorAppointmentDetails.css";
import m from "../../../assets/m.jpg";
import m1 from "../../../assets/m1.jpg";

import NavBar from "../../../components/NavBar/NavBar";

/*************  ✨ Codeium Command 🌟  *************/
function AddDoctorAppointmentDetails() {
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
      <label className=" text112">Meet Our <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Expert Doctor </label>
      <div className="background-image-section">
        <form className="da-form-group">
          
          <div className="mb-3">
            <label className="da-control-label">Patient Name</label>
            <input
              type="text"
              className="da-form-control"
              placeholder="Enter patient name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="da-control-label">Gender</label>

            <div style={{ display: "flex" }}>
              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <input type="radio" id="maleRadio" name="gender" required />
              &nbsp;&nbsp;&nbsp;
              <label className="da-control-label" htmlFor="maleRadio">
                {" "}
                Male
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" id="femaleRadio" name="gender" required />
              &nbsp;&nbsp;&nbsp;
              <label className="da-control-label" htmlFor="femaleRadio">
                Female
              </label>
            </div>
          </div>
          <br />

          <div className="mb-3">
            <label className="da-control-label">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter address"
              required
              className="da-form-control"
              style={{ height: "50px" }}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="da-control-label">Patient Age</label>
            <input
              type="number"
              className="da-form-control"
              placeholder="Enter age"
              required
            />
          </div>
          <div className="mb-3">
            <label className="da-control-label">Contact Number</label>
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
          </div>

          <div className="mb-3">
            <label className="da-control-label">Appointment Date</label>
            <input type="date" className="da-form-control" required />
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <input type="checkbox" id="consent" required />
            <label className="da-control-labell">
              &nbsp;&nbsp;&nbsp;I consent to the processing of my personal data
              in accordance with the Privacy Policy.
            </label>
          </div>
          <br />
          <br />
          <button type="submit" className="submit">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
/******  1a4b7982-92f7-490c-80f9-53b31d69a496  *******/

export default AddDoctorAppointmentDetails;
