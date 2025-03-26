import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./EditDoctorProfile.css";

function EditDoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    dob: "",
    specialty: "",
    city: "",
    state: "",
    phone: "",
    gender: "",
    photo: null,
  });

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
      const doctorData = response.data;
      setFormData({
        firstName: doctorData.firstName || "",
        lastName: doctorData.lastName || "",
        email: doctorData.email || "",
        address: doctorData.address || "",
        dob: doctorData.dob || "",
        specialty: doctorData.specialty || "",
        city: doctorData.city || "",
        state: doctorData.state || "",
        phone: doctorData.phone || "",
        gender: doctorData.gender || "",
        photo: null, // Photo will be handled separately
      });
    } catch (error) {
      console.error("Error fetching doctor:", error);
      toast.error("Failed to fetch doctor details");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          updatedData.append(key, formData[key]);
        }
      });

      const response = await axios.put(`http://localhost:5000/api/doctors/${id}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Doctor profile updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/doctors"); // Redirect to AdminDoctorManage.jsx page
        });
      } else {
        throw new Error(response.data.message || "Failed to update doctor profile");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      Swal.fire("Error", error.response?.data?.message || "Failed to update doctor profile", "error");
    }
  };

  return (
    <div className="edit-doctor-container">
      <div className="edit-doctor-card">
        <h2 className="edit-title">Edit Doctor Profile</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Specialty</label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Specialty</option>
              <option value="Eye Surgeon">Eye Surgeon</option>
              <option value="Optometrist">Optometrist</option>
              <option value="Ophthalmologist">Ophthalmologist</option>
            </select>
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/doctors")} // Navigate back to AdminDoctorManage.jsx
            >
              Cancel
            </button>
            <button type="submit" className="update-btn">
              Update Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDoctorProfile;
