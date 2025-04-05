import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import doctorImage from "../../assets/doctor-image.png";
import './DoctorProfileFrom.css';

const DoctorProfileForm = ({ onDoctorAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      setLoading(false);
      return;
    }

    try {
      if (!firstName || !lastName || !email || !address || !dob || !specialty || !city || !state || !phone || !gender) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("dob", dob);
      formData.append("specialty", specialty);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("phone", phone);
      formData.append("gender", gender);

      if (photo) {
        formData.append("photo", photo);
      }

      const response = await axios.post(
        "http://localhost:5000/api/doctors",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Doctor profile created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          resetForm();
          if (onDoctorAdded) {
            onDoctorAdded(response.data.doctor); // Notify parent component
          }
          navigate("/admin/doctors"); // Redirect to AdminDoctorManage.jsx page
        });
      } else {
        throw new Error(response.data.message || "Failed to create doctor profile");
      }
    } catch (error) {
      console.error("Error creating doctor:", error);
      Swal.fire("Error", error.response?.data?.message || "Failed to create doctor profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setAddress('');
    setDob('');
    setSpecialty('');
    setCity('');
    setState('');
    setPhone('');
    setGender('');
    setPhoto(null);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <DashboardLayout title="Add Doctor Profile">
      <div>
        <div className="doctor-container4617">
          <div className="image-container4617">
            <img src={doctorImage} alt="Doctor" className="doctor-image4617" />
          </div>
          <div className="form-container4617">
            <h2 className="form-title4617">Add Doctor Profile</h2>
            <form onSubmit={handleSubmit} className="form4617">
              <div className="form-group4617">
                <label>First Name </label> 
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="input-field4617"
                />
              </div>
              <div className="form-group4617">
                <label>Last Name </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="input-field4617"
                />
              </div>
              <div className="form-group4617">
                <label>Email </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field4617"
                />
              </div>
              <div className="form-group4617">
                <label>Address </label>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="input-field4617"
                />
              </div>
              <div className="form-group4617">
                <label>Date of Birth</label>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="input-field4617"
                />
              </div>
              <div className="form-group4617">
                <label>Specialty </label>
              <select
                  
                  
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  required
                  className="input-field4617"
                >
                  <option value="" disabled>Select Specialty</option>
                  <option value="Eye Surgeon">Eye Surgeon</option>
                  <option value="Optometrist">Optometrist</option>
                  <option value="Ophthalmologist">Ophthalmologist</option>
                </select>

              </div>
              
              
              <div className="form-group4617">
                <label>City </label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="input-field4617"
                />
              </div>
              <div className="form-group4617">
                <label>State </label>
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="input-field4617"
                />
              </div>
              <div className="form-group4617">
                <label>Phone Number </label>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="input-field4617"
                  pattern="\d{10}"
                  title="Phone number must be exactly 10 digits"
                />
              </div>
              <div className="form-group4617">
                <label>Gender </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="input-field4617"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  
                </select>
              </div>
              <div className="form-group4617">
                <label> Doctor Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="input-field4617"
                />
              </div>
              <button type="submit" disabled={loading} className="submit-button4617">
                {loading ? 'Creating...' : 'Create Doctor Profile'}
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorProfileForm;
