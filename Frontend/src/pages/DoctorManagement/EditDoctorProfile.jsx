import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import doctorImage from "../../assets/doctor-image21.jpg";
import "./EditDoctorProfile.css";

const EditDoctorProfile = () => {
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
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

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
        photo: null, // Reset photo to null to allow for new upload
      });
      setCurrentPhoto(doctorData.photo);
      
      // Set initial photo preview if doctor has a photo
      if (doctorData.photo) {
        setPhotoPreview(`http://localhost:3000/uploads/${doctorData.photo}`);
      }
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
    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
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
    <DashboardLayout title="Edit Doctor Profile">
      <div className="edit-doc-container4917">
        <div className="edit-doc-header4917">
          {currentPhoto ? (
            <img 
              src={`http://localhost:3000/uploads/${currentPhoto}`}
              alt="Current Doctor" 
              className="edit-doc-image4917" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = doctorImage;
              }}
            />
          ) : (
            <img src={doctorImage} alt="Doctor" className="edit-doc-image4917" />
          )}
          <div className="edit-doc-header-text4917">
            <h2>Edit Doctor Profile</h2>
            <p>Update the doctor's information in the system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="edit-doc-form4917">
          <div className="edit-doc-section4917">
            <h3>Personal Information</h3>
            <div className="edit-doc-grid4917">
              <div className="edit-doc-group4917">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="edit-doc-group4917">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="edit-doc-section4917">
            <h3>Contact Details</h3>
            <div className="edit-doc-grid4917">
              <div className="edit-doc-group4917">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="edit-doc-group4917">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="\d{10}"
                  required
                />
              </div>
            </div>
          </div>

          <div className="edit-doc-section4917">
            <h3>Professional Details</h3>
            <div className="edit-doc-grid4917">
              <div className="edit-doc-group4917">
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
              <div className="edit-doc-group4917">
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

          <div className="edit-doc-section4917">
            <h3>Location</h3>
            <div className="edit-doc-grid4917">
              <div className="edit-doc-group4917 edit-doc-full-width4917">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="edit-doc-group4917">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="edit-doc-group4917">
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

          <div className="edit-doc-section4917">
            <h3>Profile Photo</h3>
            <div className="edit-doc-group4917">
              <div className="edit-doc-photo-preview4917">
                {photoPreview ? (
                  <div>
                    <img 
                      src={photoPreview}
                      alt="Doctor preview" 
                      className="edit-doc-preview4917"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = doctorImage;
                      }}
                    />
                    <div className="edit-doc-filename4917">
                      
                    </div>
                  </div>
                ) : (
                  <div className="edit-doc-no-photo4917">
                    No photo selected
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="edit-doc-file-input4917"
              />
            </div>
          </div>

          <div className="edit-doc-actions4917">
            <button type="button" onClick={() => navigate('/admin/doctors')} className="edit-doc-cancel-btn4917">
              Cancel
            </button>
            <button type="submit" className="edit-doc-submit-btn4917">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditDoctorProfile;