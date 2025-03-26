import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Myappointment.css";
import NavBar from "../../../components/NavBar/NavBar";
import "../../../components/NavBar/NavBar.css";
import Swal from "sweetalert2";
import Footer from '../../../components/Footer/footer.jsx';
import { useReactToPrint } from "react-to-print";

function MyAppointmentScreen() {
  const [appointments, setAppointments] = useState([]);
  const componentPDF = useRef();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [email, setEmail] = useState("madushdilshan222@gmail.com");

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/doctorappointment/getalldoctorappointment/${email}`
        );
        setAppointments(response.data.doctorAppointments);
        console.log(response.data.doctorAppointments);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAppointments();
  }, [email]); // Ensure useEffect depends on email

  const deleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/doctorappointment/deletedoctorappointment/${id}`
        );
        console.log(response.data);
        Swal.fire("Successfull", "You Appointment is deleted", "success").then(
          (result) => {
          window.location.reload();
          }
       );
      } catch (error) {
        console.log(error);
        Swal.fire("Error with deleting appointment.");
      }
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "eyeCAREoptical_doctor_appointment",
  });

  return (
    <div>
      <NavBar />
      <div className="row mb-5 appotable" ref={componentPDF}>
        <br />
        <br />
        <br />
        <div className="appointment-grid">
          {appointments.map((appointment) => (
            <div className="fulldetailsapp" key={appointment._id}>
              <div>
                <p>
                  {" "}
                  <span style={{ fontSize: "19px" }}>
                    Patient Name:{" "}
                    <b>
                      {appointment.firstname} {appointment.lastname}
                    </b>
                  </span>
                  <br />
                  <span style={{ fontSize: "19px" }}>
                    Age: <b>{appointment.age} Years</b>
                  </span>
                  <br />
                  <span style={{ fontSize: "19px" }}>
                    Gender: <b>{appointment.gender}</b>
                  </span>
                  <br />
                  <span style={{ fontSize: "19px" }}>
                    Appointment Date: <b>{appointment.date}</b>
                  </span>
                  <br />
                  <span style={{ fontSize: "19px" }}>
                    {appointment.email}
                    <br />
                  </span>
                  <span className="conadd">
                    {appointment.contact} | {appointment.address}
                    <br />
                  </span>
                  <hr style={{ marginRight: "30px" }}></hr>
                  <div className="namedatefee">
                    <span>
                      Doctor Name: <b>{appointment.doctor}</b>
                    </span>
                    <br />
                    <span>
                      Doctor Fee: <b>RS {appointment.doctorfee}.00</b>
                    </span>
                    <br />
                  </div>
                </p>
              </div>
              <div className="updatedelectbtn">
                <Link to={`/editdoctorappointment/${appointment._id}`}>
                  <button className="appupdate">Update</button>
                </Link>
                <button
                  className="appdelect"
                  onClick={() => deleteAppointment(appointment._id)}
                >
                  Delete
                </button>
                <button
                  className="reservationpdfbtn"
                  onClick={generatePDF}
                  style={{ marginLeft: "60px" }}
                >
                  <i className="fa fa-download" aria-hidden="true"></i>
                  <span style={{ fontSize: "10px", marginLeft: "10px" }}>
                    Download Appointment
                  </span>
                </button>
              </div>
              
            </div>
          ))}
        </div>
        <br />
        <br />
        <br /> <br />
        <br />
        <br /> <br />
      </div>
      <Footer/>
    </div>
    
  );
}

export default MyAppointmentScreen;
