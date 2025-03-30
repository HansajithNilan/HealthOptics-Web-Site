import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Correctly import autoTable
import "./Myappointment.css";
import NavBar from "../../../components/NavBar/NavBar";
import "../../../components/NavBar/NavBar.css";
import Swal from "sweetalert2";
import Footer from "../../../components/Footer/footer.jsx";

function MyAppointmentScreen() {
  const [appointments, setAppointments] = useState([]);
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
  }, [email]);

  const deleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/doctorappointment/deletedoctorappointment/${id}`
        );
        console.log(response.data);
        Swal.fire("Successfull", "Your Appointment is deleted", "success").then(
          () => {
            window.location.reload();
          }
        );
      } catch (error) {
        console.log(error);
        Swal.fire("Error with deleting appointment.");
      }
    }
  };

  const generatePDF = (appointment) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Doctor Appointment Details", 14, 20);

    const tableColumn = ["Field", "Details"];
    const tableRows = [
      ["Patient Name", `${appointment.firstname} ${appointment.lastname}`],
      ["Age", `${appointment.age} Years`],
      ["Gender", appointment.gender],
      ["Appointment Date", appointment.date],
      ["Email", appointment.email],
      ["Contact", appointment.contact],
      ["Address", appointment.address],
      ["Doctor Name", appointment.doctor],
      ["Doctor Fee", `RS ${appointment.doctorfee}.00`],
    ];

    autoTable(doc, { // Use autoTable from the imported plugin
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`Appointment_${appointment.firstname}_${appointment.lastname}.pdf`);
  };

  return (
    <div>
      <NavBar />
      <div className="row mb-5 appotable">
        <br />
        <br />
        <br />
        <div className="appointment-grid">
          {appointments.map((appointment) => (
            <div className="fulldetailsapp" key={appointment._id}>
              <div>
                <p>
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
                  onClick={() => generatePDF(appointment)}
                  style={{ marginLeft: "60px" }}
                >
                  <i className="fa fa-download" aria-hidden="true"></i>
                  <span style={{ fontSize: "10px", marginLeft: "10px" }}>
                    Download PDF
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
      <Footer />
    </div>
  );
}

export default MyAppointmentScreen;
