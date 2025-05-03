import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./AdminDoctorManage.css";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

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
    setShowAllDoctors(!showAllDoctors);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");

    if (viewDoctor) {
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
        theme: "striped",
        headStyles: { fillColor: [33, 150, 243] },
      });

      doc.save(`${viewDoctor.firstName}_${viewDoctor.lastName}_report.pdf`);
    } else {
      doc.text("All Doctors Report", 14, 22);
      const headers = [["Name", "Specialty", "Email", "Phone", "Gender", "City", "State"]];
      const data = doctors.map((doctor) => [
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
        theme: "striped",
        headStyles: { fillColor: [33, 150, 243] },
      });

      doc.save("all_doctors_report.pdf");
    }
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
            <button onClick={generatePDF} className="generate-pdf-btnADOM">
              <i className="fas fa-file-pdf"></i> Generate Report
            </button>
            <button onClick={handleAdd} className="add-doctor-btnADOM">
              <i className="fas fa-plus"></i> Add New Doctor
            </button>
            <button onClick={handleToggleAllDoctors} className="view-all-doctors-btnADOM">
              <i className="fas fa-table"></i> {showAllDoctors ? "Hide Table" : "View All Doctors"}
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
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
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
                <h2>Doctor Details</h2>
              </div>
              <div className="modal-body-viewDoctorADOM">
                {viewDoctor.photo ? (
                  <div className="doctor-photo-viewDoctorADOM">
                    <img
                      src={`http://localhost:3000/uploads/${viewDoctor.photo}`}
                      alt={`${viewDoctor.firstName} ${viewDoctor.lastName}`}
                    />
                  </div>
                ) : (
                  <div className="no-photo-viewDoctorADOM">No Photo Available</div>
                )}
                <p><strong>Name:</strong> {`${viewDoctor.firstName} ${viewDoctor.lastName}`}</p>
                <p><strong>Specialty:</strong> {viewDoctor.specialty}</p>
                <p><strong>Email:</strong> {viewDoctor.email}</p>
                <p><strong>Phone:</strong> {viewDoctor.phone}</p>
                <p><strong>Gender:</strong> {viewDoctor.gender}</p>
                <p><strong>City:</strong> {viewDoctor.city}</p>
                <p><strong>State:</strong> {viewDoctor.state}</p>
                <p><strong>Address:</strong> {viewDoctor.address}</p>
                <p><strong>Date of Birth:</strong> {viewDoctor.dob}</p>
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