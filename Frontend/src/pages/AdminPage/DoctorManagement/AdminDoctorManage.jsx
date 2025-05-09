import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./AdminDoctorManage.css";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { TfiViewListAlt } from "react-icons/tfi";
import { IoMdPersonAdd } from "react-icons/io";
import logo from "../../../../public/website_logo.png"; // Add this import

const AdminDoctorManage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to fetch doctors");
    }
  };

  const handleAdd = () => {
    navigate("/doctorprofile");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/doctors/${id}`);
      setDoctors((prev) => prev.filter((doc) => doc._id !== id));
      toast.success("Doctor deleted successfully!");
      Swal.fire({
        title: "Deleted!",
        text: "Doctor has been removed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      toast.error("Failed to delete doctor");
      console.error("Error deleting doctor:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteModal(true);
  };

  const handleEdit = (id) => {
    navigate(`/editdoctor/${id}`);
  };

  const handleView = (id) => {
    const doctor = doctors.find((doc) => doc._id === id);
    setViewDoctor(doctor);
    setShowViewModal(true);
  };

  const handleToggleAllDoctors = () => {
    navigate('/admin/doctors/all', { state: { doctors: filteredDoctors } });
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (doctor.firstName.toLowerCase().includes(search.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(search.toLowerCase())) &&
      (specialty === "" || doctor.specialty === specialty)
  );

  return (
    <DashboardLayout title="Doctor Management">
      <div className="doctor-admin-containerADOM">
        <div className="dashboard-headerADOM">
          <div className="action-buttonsADOM">
            <button onClick={handleAdd} className="add-doctor-btnADOM">
              <i className="fas fa-plus"></i> <IoMdPersonAdd /> Add New Doctor
            </button>
            <button onClick={handleToggleAllDoctors} className="view-all-doctors-btnADOM">
              <i className="fas fa-table"></i> <TfiViewListAlt /> View All Doctors
            </button>
          </div>
        </div>

        <div className="search-filtersADOM">
          <div className="search-boxADOM">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="specialty-selectADOM"
          >
            <option value="">All Specialties</option>
            <option value="Eye Surgeon">Eye Surgeon</option>
            <option value="Optometrist">Optometrist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
          </select>
        </div>

        {showAllDoctors && (
          <></>
        )}

        <div className="doctors-gridADOM">
          {filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="doctor-cardADOM">
              <div className="doctor-imageADOM">
                {doctor.photo ? (
                  <img
                    src={`http://localhost:3000/uploads/${doctor.photo}`}
                    alt={`${doctor.firstName} ${doctor.lastName}`}
                  />
                ) : (
                  <div className="no-photoADOM">No Photo</div>
                )}
              </div>
              <div className="doctor-infoADOM">
                <h3>{`${doctor.firstName} ${doctor.lastName}`}</h3>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>City:</strong> {doctor.city}</p>
                <p><strong>State:</strong> {doctor.state}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
              </div>
              <div className="doctor-actionsADOM">
                <button
                  onClick={() => handleView(doctor._id)}
                  className="action-btnADOM view-btnADOM"
                  title="View Details"
                >
                  <FaEye className="btn-iconADOM" />
                  View
                </button>
                <button
                  onClick={() => handleEdit(doctor._id)}
                  className="action-btnADOM edit-btnADOM"
                  title="Edit Doctor"
                >
                  <FaEdit className="btn-iconADOM" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(doctor)}
                  className="action-btnADOM delete-btnADOM"
                  title="Delete Doctor"
                >
                  <FaTrashAlt className="btn-iconADOM" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showDeleteModal && (
          <div className="modal-overlay-deleteDoctorADOM">
            <div className="modal-content-deleteDoctorADOM">
              <div className="modal-header-deleteDoctorADOM">
                <h2>Confirm Deletion</h2>
                <button onClick={() => setShowDeleteModal(false)} className="close-btn-deleteDoctorADOM">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body-deleteDoctorADOM">
                <p>
                  Are you sure you want to delete Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}?
                </p>
                <p className="warning-text-deleteDoctorADOM">This action is irreversible.</p>
              </div>
              <div className="modal-actions-deleteDoctorADOM">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="cancel-btn-deleteDoctorADOM"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedDoctor._id)}
                  className="delete-confirm-btn-deleteDoctorADOM"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showViewModal && viewDoctor && (
          <div className="modal-overlay-viewDoctorADOM">
            <div className="modal-content-viewDoctorADOM">
              <div className="modal-header-viewDoctorADOM">
                <div className="header-with-logo-viewDoctorADOM">
                  <img src={logo} alt="HealthOptics Logo" className="logo-viewDoctorADOM" />
                  <h2>Dr. {viewDoctor.firstName} {viewDoctor.lastName}'s Profile</h2>
                </div>
              </div>
              <div className="modal-body-viewDoctorADOM">
                <div className="doctor-photo-container-viewDoctorADOM">
                  {viewDoctor.photo ? (
                    <img
                      src={`http://localhost:3000/uploads/${viewDoctor.photo}`}
                      alt={`Dr. ${viewDoctor.firstName} ${viewDoctor.lastName}`}
                      className="doctor-photo-viewDoctorADOM"
                    />
                  ) : (
                    <div className="no-photo-viewDoctorADOM">
                      <span>No Photo Available</span>
                    </div>
                  )}
                </div>
                
                <div className="doctor-info-sections-viewDoctorADOM">
                  <div className="info-section-viewDoctorADOM">
                    <h3>Professional Details</h3>
                    <p><strong>Specialty:</strong> {viewDoctor.specialty}</p>
                    <p><strong>Gender:</strong> {viewDoctor.gender}</p>
                  </div>

                  <div className="info-section-viewDoctorADOM">
                    <h3>Contact Information</h3>
                    <p><strong>Email:</strong> {viewDoctor.email}</p>
                    <p><strong>Phone:</strong> {viewDoctor.phone}</p>
                  </div>

                  <div className="info-section-viewDoctorADOM">
                    <h3>Location</h3>
                    <p><strong>Address:</strong> {viewDoctor.address}</p>
                    <p><strong>City:</strong> {viewDoctor.city}</p>
                    <p><strong>State:</strong> {viewDoctor.state}</p>
                  </div>

                  <div className="info-section-viewDoctorADOM">
                    <h3>Personal Details</h3>
                    <p><strong>Date of Birth:</strong> {new Date(viewDoctor.dob).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="modal-actions-viewDoctorADOM">
                <button onClick={() => setShowViewModal(false)} className="close-btn-viewDoctorADOM">
                  Close
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