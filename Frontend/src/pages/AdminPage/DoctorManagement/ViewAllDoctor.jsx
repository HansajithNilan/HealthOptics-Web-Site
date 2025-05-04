import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import "./ViewAllDoctor.css";
import Swal from "sweetalert2";
import { RiDownload2Fill } from "react-icons/ri";

const ViewAllDoctor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (location.state?.doctors) {
      setDoctors(location.state.doctors);
    }
  }, [location]);

  const goToCustomReport = () => {
    navigate("/admin/doctors/report", { state: { doctors } });
  };

  return (
    <DashboardLayout title="All Doctors">
      <div className="dashboard-headerADOM">
        <button onClick={goToCustomReport} className="generate-pdf-btnADOM">
          <i className="fas fa-file-pdf"></i> Generate PDF Report <RiDownload2Fill />
        </button>
      </div>
      <div className="all-doctors-table-containerADOM">
        <table className="all-doctors-tableADOM">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>City</th>
              <th>State</th>
              <th>Address</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>
                    {doctor.photo ? (
                      <img
                        src={`http://localhost:3000/uploads/${doctor.photo}`}
                        alt={`${doctor.firstName} ${doctor.lastName}`}
                        className="doctor-photo-tableADOM"
                      />
                    ) : (
                      <span className="no-photo-tableADOM">No Photo</span>
                    )}
                  </td>
                  <td>{`${doctor.firstName} ${doctor.lastName}`}</td>
                  <td>{doctor.specialty}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.city}</td>
                  <td>{doctor.state}</td>
                  <td>{doctor.address}</td>
                  <td>{doctor.dob}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-dataADOM">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ViewAllDoctor;
