import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import doctorImage from "../../assets/doctor-image21.jpg";
import './DoctorProfileFrom.css';

const DoctorProfileForm = ({ onDoctorAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    dob: '',
    specialty: '',
    city: '',
    state: '',
    phone: '',
    gender: ''
<<<<<<< HEAD
    
=======
>>>>>>> 9ca2a4e (Minor Updates)
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

=======
>>>>>>> 9ca2a4e (Minor Updates)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

<<<<<<< HEAD
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

=======
>>>>>>> 9ca2a4e (Minor Updates)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      setLoading(false);
      return;
    }

    try {
      const requiredFields = Object.keys(formData);
      if (requiredFields.some(field => !formData[field])) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (photo) data.append("photo", photo);

      const response = await axios.post(
        "http://localhost:3000/api/doctors",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Doctor profile created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setFormData({
            firstName: '', lastName: '', email: '', address: '',
            dob: '', specialty: '', city: '', state: '', phone: '', gender: ''
          });
          setPhoto(null);
<<<<<<< HEAD
          setPhotoPreview(null);
=======
>>>>>>> 9ca2a4e (Minor Updates)
          onDoctorAdded?.(response.data.doctor);
          navigate("/admin/doctors");
        });
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to create doctor profile", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add New Doctor Profile">
<<<<<<< HEAD
      <div className="add-doctor-container4917">
        <div className="add-doctor-header4917">
          <img src={doctorImage} alt="Doctor" className="add-doctor-image4917" />
          <div className="add-doctor-header-text4917">
=======
      <div className="dpf-container">
        <div className="dpf-header">
          <img src={doctorImage} alt="Doctor" className="dpf-image" />
          <div className="dpf-header-text">
>>>>>>> 9ca2a4e (Minor Updates)
            <h2>Create Doctor Profile</h2>
            <p>Fill in the details to add a new doctor to the system</p>
          </div>
        </div>

<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="add-doctor-form4917">
          <div className="add-doctor-section4917">
            <h3>Personal Information</h3>
            <div className="add-doctor-grid4917">
              <div className="add-doctor-group4917">
=======
        <form onSubmit={handleSubmit} className="dpf-form">
          <div className="dpf-section">
            <h3>Personal Information</h3>
            <div className="dpf-grid">
              <div className="dpf-group">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
<<<<<<< HEAD
              <div className="add-doctor-group4917">
=======
              <div className="dpf-group">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
<<<<<<< HEAD
              <div className="add-doctor-group4917">
=======
              <div className="dpf-group">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
<<<<<<< HEAD
              <div className="add-doctor-group4917">
=======
              <div className="dpf-group">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
<<<<<<< HEAD
              <div className="add-doctor-group4917">
=======
              <div className="dpf-group">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className="dp-DATAsection4917">
            <h3>Professional Details</h3>
            <div className="add-doctor-grid4917">
              <div className="add-doctor-group4917">
=======
          <div className="dp-DATAsection">
            <h3>Professional Details</h3>
            <div className="dpf-grid">
              <div className="dpf-group">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>Specialty</label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Specialty</option>
                  <option value="Eye Surgeon">Eye Surgeon</option>
                  <option value="Optometrist">Optometrist</option>
                  <option value="Ophthalmologist">Ophthalmologist</option>
                </select>
              </div>
<<<<<<< HEAD
              <div className="add-doctor-group4917">
=======
              <div className="dpf-group">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                />
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className="add-doctor-section4917">
            <h3>Location</h3>
            <div className="add-doctor-grid4917">
              <div className="add-doctor-group4917 add-doctor-full-width4917">
=======
          <div className="dpf-section">
            <h3>Location</h3>
            <div className="dpf-grid">
              <div className="dpf-group dpf-full-width">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
<<<<<<< HEAD
              <div className="add-doctor-group4917">
=======
              <div className="dpf-group">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
<<<<<<< HEAD
              <div className="add-doctor-group4917">
=======
              <div className="dpf-group">
>>>>>>> 9ca2a4e (Minor Updates)
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className="add-doctor-section4917">
            <h3>Profile Photo</h3>
            <div className="add-doctor-group4917">
              <div className="add-doctor-photo-preview4917">
                {photoPreview && (
                  <img 
                    src={photoPreview}
                    alt="Preview" 
                    className="add-doctor-preview-image4917"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="add-doctor-file-input4917"
=======
          <div className="dpf-section">
            <h3>Profile Photo</h3>
            <div className="dpf-group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
>>>>>>> 9ca2a4e (Minor Updates)
              />
            </div>
          </div>

<<<<<<< HEAD
          <button type="submit" disabled={loading} className="add-doctor-submit4917">
=======
          <button type="submit" disabled={loading} className="dpf-submit">
>>>>>>> 9ca2a4e (Minor Updates)
            {loading ? 'Creating Profile...' : 'Create Doctor Profile'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DoctorProfileForm;