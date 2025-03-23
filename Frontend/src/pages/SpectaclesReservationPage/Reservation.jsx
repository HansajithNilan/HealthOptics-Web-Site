import React, { useState } from "react";

import NavBar from "../../components/NavBar/NavBar.jsx";
import "./Reservation.css";

import ImageDoctor from "../../assets/doctor-cheking-image1.jpg";
import Footer from "../../components/Footer/footer.jsx";
import Contact from "../HomePage/contact/contact.jsx";

function Reservation() {
  const [frametype, setFrameType] = useState(""); // Default to a valid option

  return (
    <div className="spectales-reservation-page">
      <NavBar />
      <div className="spectacles-section">
        <h1>Reserve your Spectacles</h1>
        <div className="reserve-main-section">
          <div className="Image-section">
            <img src={ImageDoctor} alt="Doctor Checking" className="image-reserve" />
          </div>
          <div className="reserve-section">
            <form className="reserve-form">
              <h1>Personal Details</h1>
              <div className="name-mobnumber">
                <label>Name:</label>
                <input type="text" placeholder="Enter your name" />
                <label>Mobile Number:</label>
                <input type="text" placeholder="Enter your phone number" />
              </div>
              <div className="name-mobnumber">
                <label>Address:</label>
                <input type="text" placeholder="Enter your address" />
                <label>Email:</label>
                <input type="text" placeholder="Enter your email" />
              </div>
              <h1>Spectacle Details</h1>
              <div className="spectacle-frame-type-meterial">
                <label htmlFor="frameType">Frame Type:</label>
                <select
                  id="frameType"
                  value={frametype}
                  onChange={(e) => setFrameType(e.target.value)}
                >
                  <option value="">Select Frame Type</option>
                  <option value="half-rim">Half Rim</option>
                  <option value="full-rim">Full Rim</option>
                </select>

                <label>Frame Material: </label>
                <input type="text" placeholder="Enter your frame material" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default Reservation;
