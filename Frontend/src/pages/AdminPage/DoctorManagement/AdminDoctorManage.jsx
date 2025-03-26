import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { toast } from 'react-toastify';
import "./AdminDoctorManage.css";

const AdminDoctorManage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleAdd = () => {
    navigate("/doctorprofile", { state: { onDoctorAdded: addDoctorToList } });
  };

  const addDoctorToList = (newDoctor) => {
    setDoctors((prevDoctors) => [newDoctor, ...prevDoctors]); // Add the new doctor to the list
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:5000/api/doctors/${id}`);
        toast.success("Doctor deleted successfully!");
        fetchDoctors();
      } catch (error) {
        toast.error("Failed to delete doctor");
        console.error("Error deleting doctor:", error);
      }
    }
  };

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteModal(true);
  };

  const handleEdit = (id) => {
    try {
      navigate(`/editdoctor/${id}`); // Navigate to EditDoctorProfile.jsx with the doctor ID
    } catch (error) {
      toast.error("Navigation failed");
      console.error("Error navigating to edit page:", error);
    }
  };

  const handleView = (id) => {
    try {
      navigate(`/doctorprofilepage/${id}`);
      toast.info("Viewing doctor details");
    } catch (error) {
      toast.error("Navigation failed");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Doctors Report", 14, 22);

    const headers = [["Name", "Specialty", "Email", "Phone", "Gender"]];
    const data = filteredDoctors.map(doctor => [
      `${doctor.firstName} ${doctor.lastName}`,
      doctor.specialty,
      doctor.email,
      doctor.phone,
      doctor.gender
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 30
    });

    doc.save("doctors_report.pdf");
  };

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (doctor.firstName.toLowerCase().includes(search.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(search.toLowerCase())) &&
      (specialty === "" || doctor.specialty === specialty)
    );
  });

  return (
    <DashboardLayout title="Doctor Management">
      <div className="doctor-admin-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Doctor Management</h1>
          <div className="action-buttons">
            <button onClick={handleAdd} className="add-doctor-btn">
              <i className="fas fa-plus"></i> Add New Doctor
            </button>
            <button onClick={generatePDF} className="report-btn">
              <i className="fas fa-file-pdf"></i> Generate Report
            </button>
          </div>
        </div>

        <div className="search-filters">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option value="">All Specialties</option>
            <option value="Eye Surgeon">Eye Surgeon</option>
            <option value="Optometrist">Optometrist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
          </select>
        </div>

        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
              <div className="doctor-image">
                {doctor.photo ? (
                  <img src={`http://localhost:5000/uploads/${doctor.photo}`} alt={`${doctor.firstName} ${doctor.lastName}`} />
                ) : (
                  <div className="no-photo">
                    <i className="fas fa-user-md"></i>
                  </div>
                )}
              </div>
              <div className="doctor-info">
                <h3>{`${doctor.firstName} ${doctor.lastName}`}</h3>
                <p className="specialty">{doctor.specialty}</p>
                <p className="location">{`${doctor.city}, ${doctor.state}`}</p>
              </div>
              <div className="doctor-actions">
                <button 
                  onClick={() => handleView(doctor._id)} 
                  className="action-btn view-btn"
                  title="View Doctor"
                >
                  <i className="fas fa-eye"></i>
                  <span>View</span>
                </button>
                <button 
                  onClick={() => handleEdit(doctor._id)} 
                  className="action-btn edit-btn"
                  title="Edit Doctor"
                >
                  <i className="fas fa-edit"></i>
                  <span>Edit</span>
                </button>
                <button 
                  onClick={() => handleDeleteClick(doctor)} 
                  className="action-btn delete-btn"
                  title="Delete Doctor"
                >
                  <i className="fas fa-trash"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content delete-modal">
              <div className="modal-header">
                <h2>Delete Doctor</h2>
                <button onClick={() => setShowDeleteModal(false)} className="close-btn">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="warning-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <p>Are you sure you want to delete Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}?</p>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={() => handleDelete(selectedDoctor._id)} className="delete-confirm-btn">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDoctorManage;
