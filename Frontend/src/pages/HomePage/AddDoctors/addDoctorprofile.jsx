import React, { useEffect, useState } from "react";
import axios from "axios";
import "./addDoctorprofile.css";

const AddDoctorProfile = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data); // Fetch and set doctor details
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="add-doctor-profile-container-vihani">
      <h1>Doctor Profiles</h1>
      <div className="doctor-grid-vihani">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card-vihani">
            <div className="doctor-image-vihani">
              {doctor.photo ? (
                <img
                  src={`http://localhost:5000/uploads/${doctor.photo}`}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                />
              ) : (
                <div className="no-photo-vihani">No Photo</div>
              )}
            </div>
            <div className="doctor-info-vihani">
              <h3>{`${doctor.firstName} ${doctor.lastName}`}</h3>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>City:</strong> {doctor.city}</p>
              <p><strong>State:</strong> {doctor.state}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddDoctorProfile;
