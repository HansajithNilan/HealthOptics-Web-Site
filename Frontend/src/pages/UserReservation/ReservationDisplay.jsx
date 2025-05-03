import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import "./ReservationDisplay.css";
import NavBar from "../../components/NavBar/NavBar";
import logo from "../../../public/website_logo.png";
import Contact from "../HomePage/contact/contact";
import Footer from "../../components/Footer/footer";

function ReservationDisplay() {
  const [details, setDetails] = useState();
  const fetchDataRef2 = useRef(false);
  const { number } = useParams();

  useEffect(() => {
    if (fetchDataRef2.current) return;
    fetchDataRef2.current = true;

    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/auth/reservation/getreservationnumber/${number}`
        );

        const data = res.data;
        console.log(data);

        setDetails({
          name: data.name,
          phonenumber: data.phonenumber,
          address: data.address,
          email: data.email,
          brand: data.brand,
          frameshape: data.frameshape,
          imageurlcolor: data.imageurlcolor,
          framesize: data.framesize,
          frametype: data.frametype,
          framematerial: data.framematerial,
          gender: data.gender,
          quantity: data.quantity,
          price: Number(data.price),
        });
      } catch (error) {
        console.error("Error fetching reservationDetails:", err);
      }
    };

    fetchDetails();
  }, [number]);

  const getCurrentDate = ()=>{
    const today = new Date();
    return today.toLocaleDateString("en-GB");
  }

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reservation-display-page">
      <NavBar />
      <div className="reservation-person-name">
        <h1>{details.name}'s Reservation Details</h1>
      </div>
      <div className="reservation-page-contain">
        <div className="invoice-header-section">
          <div className="logo-section-reservation">
            <img src={logo} width={90} height={80} />
          </div>
          <div className="company-name-reservation">
            <p>
              HealthOptics
              <br />
              (Pvt) Ltd<br/>
             
            </p>
            
          </div>
        </div>
        <div className="customer-display-details">
          <div className="name-date-section">
          <div className="customer-name">
          <h4>Customer name : </h4>
              <p>{details.name}</p>

          </div>
          <div className="customer-name">
            <h4>Date : </h4>
            <p> {getCurrentDate()}</p>
          </div>
          </div>
          <div className="name-date-section">
          <div className="customer-name">
          <h4>Mobile : </h4>
              <p>{details.phonenumber}</p>

          </div>
          
          </div>
          <div className="name-date-section">
          <div className="customer-name">
          <h4>Adress  : </h4>
              <p>{details.address}</p>

          </div>
          <div className="customer-name">
            
          </div>
          </div>
          <div className="name-date-section">
          <div className="customer-name">
          <h4>Email : </h4>
              <p>{details.email}</p>

          </div>
          <div className="customer-name">
            
            
          </div>

          </div>
          <div className="name-date-section">
          <div className="customer-name">
          <h4> Frame Type : </h4>
              <p>{details.frametype}</p>

          </div>
          <div className="customer-name">
          <h4> Frame Material : </h4>
          <p>{details.framematerial}</p>
            
          </div>
          
          </div>
          <div className="name-date-section">
          <div className="customer-name">
          <h4> Spectacle Size : </h4>
              <p>{details.framesize}</p>

          </div>
          <div className="customer-name">
          <h4> Quantity : </h4>
          <p>{details.quantity}</p>
            
          </div>
          
          </div>
          <div className="name-date-section">
          <div className="customer-name">
          <h4> Frame Shape : </h4>
              <p>{details.frameshape}</p>

          </div>
          <div className="customer-name">
          <h4> Gender : </h4>
          <p>{details.gender}</p>
            
          </div>
          
          </div>
          <div className="name-date-section">
          <div className="customer-name">
          <h4> Brand : </h4>
              <p>{details.brand}</p>

          </div>
          <div className="customer-name">
          <h4> Total Price : </h4>
          <p>{details.price}</p>
            
          </div>
          
          </div>
        </div>
      </div>
<Contact/>
<Footer/>
    </div>
  );
}

export default ReservationDisplay;
