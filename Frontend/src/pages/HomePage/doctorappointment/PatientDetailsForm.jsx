import React from "react";
import "./PatientDetailsForm.css";
import NavBar from "../../../components/NavBar/NavBar";
import "../../../components/NavBar/NavBar.css";

function PatientDetailsForm() {
  return (
    <div>
      <NavBar />
      <form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="full">
          <div class="fullform">
            <h2 className="heder">Patient Registration Form</h2>
            <label className="lb" for="fname">
              First Name
            </label>
            <input
              className="text1"
              type="text"
              id="fname"
              name="fname"
              required
            />
            <label className="lb" for="lname">
              Last Name
            </label>
            <input
              className="text1"
              type="text"
              id="lname"
              name="lname"
              required
            />
            <label className="lb" for="lname">
              Age{" "}
            </label>
            <input
              className="text1"
              type="number"
              id="lname"
              name="lname"
              required
              min="0"
              max="120"
            />
            <label className="lb" for="dob">
              {" "}
              Appointment Date
            </label>
            <input type="date" id="dob" name="dob" required /> <br />
            <label className="lb">Gender</label>
            <div style={{ display: "flex" }}>
              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                id="maleRadio"
                name="gender"
                value="Male"
                required
              />
              &nbsp;&nbsp;
              <label className="form-check-label" htmlFor="maleRadio">
                {" "}
                Male
              </label>
              &nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                id="femaleRadio"
                name="gender"
                value="Female"
                required
              />
              &nbsp;&nbsp;
              <label className="form-check-label" htmlFor="femaleRadio">
                Female
              </label>
            </div>
            <br />
            <label className="lb" for="phone">
              Phone Number
            </label>
            <input
              className="text1"
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              required
            />
            <label className="lb" for="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              style={{ width: "580px", height: "100px" }}
            ></textarea>
            <br />
            <label className="lb" for="emergency">
              Emergency Contact Number
            </label>
            <input
              className="text1"
              type="tel"
              id="emergency"
              name="emergency"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              required
            />
            <br />
            <div style={{ display: "flex" }}>
              <input type="checkbox" id="consent" name="consent" required />
              <label
                className="lb"
                for="consent"
                style={{ fontSize: "13.5px" }}
              >
                &nbsp;&nbsp;&nbsp;I consent to the processing of my personal
                data in accordance with the Privacy Policy.
              </label>
            </div>
            <br />
            <button className="appointmentbtn" type="button">
              Appointment Now!
            </button>
            <br />
            <br />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PatientDetailsForm;
