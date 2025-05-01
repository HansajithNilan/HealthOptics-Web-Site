import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/footer";
import "./OnMyAppointment.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

function OnMyAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Delete appointment with confirmation
  const deleteAppointment = async (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this appointment? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete Appointment",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/api/doctorappointment/deletedoctorappointment/${id}`
          );
          Swal.fire({
            title: "Success",
            text: "Appointment has been successfully deleted.",
            icon: "success",
            confirmButtonColor: "#15803d",
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Deletion error:", error);
          Swal.fire({
            title: "Error",
            text: "Unable to delete appointment. Please try again.",
            icon: "error",
            confirmButtonColor: "#dc2626",
          });
        }
      }
    });
  };

  // Generate PDF with refined styling
  const generatePDF = (appointment) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Appointment Details", 15, 20);

    const tableColumn = ["Field", "Information"];
    const tableRows = [
      ["Patient Name", `${appointment.firstname} ${appointment.lastname}`],
      ["Age", `${appointment.age} Years`],
      ["Gender", appointment.gender],
      ["Email", appointment.email],
      ["Contact", appointment.contact],
      ["Address", appointment.address],
      ["Date", appointment.date],
      ["Time", appointment.timeSlot],
      ["Doctor",`Dr. ${appointment.doctor}`],
      ["Total Fee", `Rs ${appointment.doctorfee || 2500}.00`],
    ];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10, cellPadding: 4, textColor: [33, 37, 41] },
      headStyles: { fillColor: [55, 65, 81], textColor: [255, 255, 255], fontStyle: "bold" },
      alternateRowStyles: { fillColor: [243, 244, 246] },
      columnStyles: { 0: { fontStyle: "bold" } },
    });

    doc.save(`Appointment_${appointment.firstname}_${appointment.lastname}.pdf`);
  };

  // Fetch appointment data
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const email = currentUser?.email;
        
        if (!email) {
          setError("Please login to view appointments");
          navigate("/loginpage");
          return;
        }

        const response = await axios.post(
          `http://localhost:5000/api/doctorappointment/getalldoctorappointment/${email}`
        );

        if (response.data.doctorAppointments) {
          setAppointments(response.data.doctorAppointments);
        } else {
          setError("No appointments found");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.response?.data?.message || "Unable to retrieve appointment details");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  if (loading) return <div className="OMA-status-message OMA-loading">Loading Appointments...</div>;
  if (error) return <div className="OMA-status-message OMA-error">{error}</div>;
  if (!appointments.length) return <div className="OMA-status-message">No appointments found.</div>;

  return (
    <div className="OMA-appointment-page">
      <NavBar />
      <main className="OMA-appointment-container">
        {appointments.map((appointment) => (
          <section key={appointment._id} className="OMA-appointment-card">
            <header className="OMA-card-header">
              <h1 className="OMA-card-title">Appointment Details</h1>
              <p className="OMA-card-subtitle">Summary of Patient and Appointment Information</p>
            </header>
            <div className="OMA-details-wrapper">
              <div className="OMA-details-section OMA-patient-section">
                <h2 className="OMA-section-title">Patient Information</h2>
                <div className="OMA-details-grid">
                  <DetailItem label="Full Name" value={`${appointment.firstname} ${appointment.lastname}`} />
                  <DetailItem label="Age" value={`${appointment.age} Years`} />
                  <DetailItem label="Gender" value={appointment.gender} />
                  <DetailItem label="Email" value={appointment.email} />
                  <DetailItem label="Contact" value={appointment.contact} />
                  <DetailItem label="Address" value={appointment.address} />
                </div>
              </div>

              <div className="OMA-details-section OMA-appointment-section">
                <h2 className="OMA-section-title">Appointment Information</h2>
                <div className="OMA-details-grid">
                  <DetailItem label="Date" value={appointment.date} />
                  <DetailItem label="Time" value={appointment.timeSlot} />
                  <DetailItem label="Doctor" value={`Dr. ${appointment.doctor}`} />
                  <DetailItem label="Total Fee" value={`Rs ${appointment.doctorfee || 0}.00`} />
                </div>
              </div>
            </div>

            <div className="OMA-action-buttons">
              <Link to={`/editdoctorappointment/${appointment._id}`}>
                <button className="OMA-btn OMA-btn-update">Edit Appointment</button>
              </Link>
              <button className="OMA-btn OMA-btn-delete" onClick={() => deleteAppointment(appointment._id)}>
                Delete Appointment
              </button>
              <button className="OMA-btn OMA-btn-download" onClick={() => generatePDF(appointment)}>
                Download PDF
              </button>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}

// Reusable DetailItem component
const DetailItem = ({ label, value }) => (
  <div className="OMA-detail-item">
    <span className="OMA-detail-label">{label}</span>
    <span className="OMA-detail-value">{value}</span>
  </div>
);

export default OnMyAppointment;