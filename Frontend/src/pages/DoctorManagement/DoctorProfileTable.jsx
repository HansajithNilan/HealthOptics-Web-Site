import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoctorProfileTable.css";

function DoctorProfileTable() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/doctors");
      setDoctors(response.data); // Ensure the response data matches the expected format
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editdoctor/${id}`); // Navigate to the edit page
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:3000/api/doctors/${id}`);
        fetchDoctors(); // Refresh the table after deletion
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  return (
    <div className="container4617">
      <div className="table-wrapper4617">
        <h2 className="text-2xl font-bold mb-4 text-center">Doctors List</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Date of Birth</th>
              <th>Specialty</th>
              <th>City</th>
              <th>State</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.firstName}</td>
                <td>{doctor.lastName}</td>
                <td>{doctor.email}</td>
                <td>{doctor.address}</td>
                <td>{new Date(doctor.dob).toLocaleDateString()}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.city}</td>
                <td>{doctor.state}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.gender}</td>
                <td>
                  {doctor.photo ? (
                    <img
                      src={`http://localhost:3000/uploads/${doctor.photo}`}
                      alt="Doctor"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = "http://localhost:3000/uploads/placeholder.png"; // Fallback image
                      }}
                      style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                    />
                  ) : (
                    "No Photo"
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(doctor._id)}>Edit</button>
                  <button onClick={() => handleDelete(doctor._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorProfileTable;
