import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import "./AdminDoctorManage.css";

const AdminDoctorManage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewDoctor, setViewDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data); // Fetch and set doctor details
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleAdd = () => {
    navigate("/doctorprofile"); // Navigate to the DoctorProfile page
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:5000/api/doctors/${id}`);
        toast.success("Doctor deleted successfully!");
        setDoctors(prev => prev.filter(doc => doc._id !== id)); // Optimistically update the UI
        Swal.fire({
          title: "Deleted!",
          text: "Doctor has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
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
    navigate(`/editdoctor/${id}`); // Navigate to EditDoctorProfile with the doctor ID
  };

  const handleView = (id) => {
    const doctor = doctors.find(doc => doc._id === id);
    setViewDoctor(doctor);
    setShowViewModal(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);

    if (viewDoctor) {
      // Generate report for the currently viewed doctor
      doc.text("Doctor Details Report", 14, 22);
      const details = [
        ["Field", "Value"],
        ["Name", `${viewDoctor.firstName} ${viewDoctor.lastName}`],
        ["Specialty", viewDoctor.specialty],
        ["Email", viewDoctor.email],
        ["Phone", viewDoctor.phone],
        ["Gender", viewDoctor.gender],
        ["City", viewDoctor.city],
        ["State", viewDoctor.state],
        ["Address", viewDoctor.address],
        ["Date of Birth", viewDoctor.dob],
      ];

      doc.autoTable({
        head: [details[0]],
        body: details.slice(1),
        startY: 30,
      });

      doc.save(`${viewDoctor.firstName}_${viewDoctor.lastName}_details.pdf`);
    } else {
      // Generate report for all doctors
      doc.text("Doctors Report", 14, 22);

      const headers = [["Name", "Specialty", "Email", "Phone", "Gender", "City", "State"]];
      const data = doctors.map(doctor => [
        `${doctor.firstName} ${doctor.lastName}`,
        doctor.specialty,
        doctor.email,
        doctor.phone,
        doctor.gender,
        doctor.city,
        doctor.state,
      ]);

      doc.autoTable({
        head: headers,
        body: data,
        startY: 30,
      });

      doc.save("doctors_report.pdf");
    }
  };

  return (
    <DashboardLayout title="Doctor Management">
      <div className="doctor-admin-container4617D">
        <div className="dashboard-header4617D">
          
          <div className="action-buttons4617D">
            <button onClick={handleAdd} className="add-doctor-btn4617D">
              <i className="fas fa-plus"></i> Add New Doctor
            </button>
            
          </div>
        </div>

        <div className="search-filters4617D">
          <div className="search-box4617D">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="specialty-select4617D">
            <option value="">All Specialties</option>
            <option value="Eye Surgeon">Eye Surgeon</option>
            <option value="Optometrist">Optometrist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
          </select>
        </div>

        <div className="doctors-grid4617D">
          {doctors.filter(doctor =>
            (doctor.firstName.toLowerCase().includes(search.toLowerCase()) ||
            doctor.lastName.toLowerCase().includes(search.toLowerCase())) &&
            (specialty === "" || doctor.specialty === specialty)
          ).map((doctor) => (
            <div key={doctor._id} className="doctor-card4617D">
              <div className="doctor-image4617D">
                {doctor.photo ? (
                  <img src={`http://localhost:5000/uploads/${doctor.photo}`} alt={`${doctor.firstName} ${doctor.lastName}`} />
                ) : (
                  <div className="no-photo4617D">No Photo</div>
                )}
              </div>
              <div className="doctor-info4617D">
                <h3>{`${doctor.firstName} ${doctor.lastName}`}</h3>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>City:</strong> {doctor.city}</p>
                <p><strong>State:</strong> {doctor.state}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
              </div>
              <div className="doctor-actions4617D">
                <button onClick={() => handleView(doctor._id)} className="action-btn4617D view-btn4617D" title="View Doctor">
                  <i className="fas fa-eye"></i> View
                </button>
                <button onClick={() => handleEdit(doctor._id)} className="action-btn4617D edit-btn4617D" title="Edit Doctor">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button onClick={() => handleDeleteClick(doctor)} className="action-btn4617D delete-btn4617D" title="Delete Doctor">
                  <i className="fas fa-trash"></i> Delete
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
                <p>Are you sure you want to delete Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}?</p>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">Cancel</button>
                <button onClick={() => handleDelete(selectedDoctor._id)} className="delete-confirm-btn">Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* View Doctor Modal */}
        {showViewModal && viewDoctor && (
          <div className="modal-overlay">
            <div className="modal-content view-modal">
              <div className="modal-header">
                <h2>Doctor Details</h2>
                <button onClick={() => setShowViewModal(false)} className="close-btn">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {`${viewDoctor.firstName} ${viewDoctor.lastName}`}</p>
                <p><strong>Specialty:</strong> {viewDoctor.specialty}</p>
                <p><strong>Email:</strong> {viewDoctor.email}</p>
                <p><strong>Phone:</strong> {viewDoctor.phone}</p>
                <p><strong>Gender:</strong> {viewDoctor.gender}</p>
                <p><strong>City:</strong> {viewDoctor.city}</p>
                <p><strong>State:</strong> {viewDoctor.state}</p>
                <p><strong>Address:</strong> {viewDoctor.address}</p>
                <p><strong>Date of Birth:</strong> {viewDoctor.dob}</p>
                {viewDoctor.photo && (
                  <div className="doctor-photo">
                    <img src={`http://localhost:5000/uploads/${viewDoctor.photo}`} alt={`${viewDoctor.firstName} ${viewDoctor.lastName}`} />
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button onClick={generatePDF} className="report-btn">Generate Report</button>
                <button onClick={() => setShowViewModal(false)} className="close-btn">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDoctorManage;
