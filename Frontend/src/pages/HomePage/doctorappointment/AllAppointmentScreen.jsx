import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllAppointment.css";
import NavBar from "../../../components/NavBar/NavBar.jsx";
import Footer from "../../../components/Footer/footer.jsx";

function AllAppointmentScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctorappointment/getallappointments"
        );
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
        setLoading(false);
      }
    };
    fetchAllAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const searchStr = searchTerm.toLowerCase();
    const fullName = `${appointment.firstname} ${appointment.lastname}`.toLowerCase();
    const doctorName = appointment.doctor ? appointment.doctor.toLowerCase() : '';
    const email = appointment.email ? appointment.email.toLowerCase() : '';
    const date = appointment.date || '';

    return (
      fullName.includes(searchStr) ||
      doctorName.includes(searchStr) ||
      email.includes(searchStr) ||
      date.includes(searchStr)
    );
  });

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <NavBar />
      <br /><br /><br />
      <div className="appotable">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by patient or doctor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div><br />
        <div className="appointment-grid">
          {filteredAppointments.map((appointment) => (
            <div className="fulldetailsapp" key={appointment._id}>
              <div className="appointment-details">
                <p>
                  <span>
                    Patient Name:{" "}
                    <b>
                      {appointment.firstname} {appointment.lastname}
                    </b>
                  </span>
                  <br />
                  <span>
                    Age: <b>{appointment.age} Years</b>
                  </span>
                  <br />
                  <span>
                    Gender: <b>{appointment.gender}</b>
                  </span>
                  <br />
                  <span>
                    Appointment Date: <b>{appointment.date}</b>
                  </span>
                  <br />
                  <span>
                    Time Slot: <b>{appointment.timeSlot}</b>
                  </span>
                  <br />
                  <span>{appointment.email}</span>
                  <br />
                  <span>
                    {appointment.contact} | {appointment.address}
                  </span>
                </p>
                <hr />
                <div className="namedatefee">
                  <span>
                    Doctor Name: <b>{appointment.doctor}</b>
                  </span>
                  <br />
                  <span>
                    Doctor Fee: <b>Rs. {appointment.doctorfee}.00</b>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div><br /><br /><br /><br />
      <Footer />
    </div>
  );
}

export default AllAppointmentScreen;