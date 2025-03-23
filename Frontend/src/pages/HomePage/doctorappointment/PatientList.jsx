import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../components/NavBar/NavBar";
import "../../../components/NavBar/NavBar.css";
import "./PatientList.css";
import { Link } from "react-router-dom";

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/patient/getPatients");
        setPatients(response.data);
      } catch (error) {
        console.error("There was an error fetching the patients!", error);
      }
    }
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/patient/deletePatient/${id}`);
      setPatients(patients.filter((patient) => patient._id !== id));
      alert("Patient deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the patient!", error);
      alert("Failed to delete patient. Please try again.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="patient-list">
        <h2 className="header">Patient List</h2>
        <table className="patient-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Emergency Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.fname}</td>
                <td>{patient.lname}</td>
                <td>{patient.age}</td>
                <td>{new Date(patient.dob).toLocaleDateString()}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone}</td>
                <td>{patient.address}</td>
                <td>{patient.emergency}</td>
                <td>
                  <Link to={`/editPatient/${patient._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(patient._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;
