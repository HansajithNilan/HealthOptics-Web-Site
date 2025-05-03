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
      const response = await axios.get(`http://localhost:3000/api/doctors/${id}`);
      const doctorData = response.data;
      setFormData({
        firstName: doctorData.firstName || "",
        lastName: doctorData.lastName || "",
        email: doctorData.email || "",
        address: doctorData.address || "",
        dob: doctorData.dob ? doctorData.dob.split("T")[0] : "",
        specialty: doctorData.specialty || "",
        city: doctorData.city || "",
        state: doctorData.state || "",
        phone: doctorData.phone || "",
        gender: doctorData.gender || "",
        photo: null,
      });
    } catch (error) {
      console.error("Error fetching doctor:", error);
      toast.error("Failed to load doctor details");
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

      const response = await axios.put(`http://localhost:3000/api/doctors/${id}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Doctor profile updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/doctors");
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
    <div className="EditDoctorProfile-wrapper">
      <div className="EditDoctorProfile-container">
        <h2 className="EditDoctorProfile-title">Edit Doctor Profile</h2>
        <form onSubmit={handleSubmit} className="EditDoctorProfile-form">
          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
              placeholder="Enter first name"
            />
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
              placeholder="Enter last name"
            />
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
              placeholder="Enter email address"
            />
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
              placeholder="Enter full address"
            />
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
            />
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">Specialty</label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
            >
              <option value="" disabled>Select Specialty</option>
              <option value="Eye Surgeon">Eye Surgeon</option>
              <option value="Optometrist">Optometrist</option>
              <option value="Ophthalmologist">Ophthalmologist</option>
            </select>
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
              placeholder="Enter city"
            />
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
              placeholder="Enter state"
            />
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
              placeholder="Enter 10-digit phone number"
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits"
            />
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="EditDoctorProfile-input"
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="EditDoctorProfile-field">
            <label className="EditDoctorProfile-label">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="EditDoctorProfile-file-input"
            />
          </div>

          <div className="EditDoctorProfile-actions">
            <button
              type="button"
              className="EditDoctorProfile-cancel-btn"
              onClick={() => navigate("/admin/doctors")}
            >
              Cancel
            </button>
            <button type="submit" className="EditDoctorProfile-submit-btn">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDoctorProfile;