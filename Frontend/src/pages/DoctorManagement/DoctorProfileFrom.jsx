import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar"; 
import "../../components/NavBar/NavBar.css"; 
import doctorImage from "../../assets/doctor-image.png";
import './DoctorProfileFrom.css';
import { useForm } from "react-hook-form";


const AddDoctorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [previewImage, setPreviewImage] = useState(null); 
  const navigate = useNavigate();
 
  const onSubmit = (data) => {
    console.log("Doctor Data:", data);
    alert("Doctor added successfully!");
    navigate("/doctorprofiletable");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <NavBar/>
    <div className="doctor-container">
     
      <div className="image-container">
        <img src={doctorImage} alt="Doctor" className="doctor-image" />
      </div>
    <div className="form-container">
      <h2 className="form-title">Add Doctor Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            {...register("firstName", { required: "First Name is required" })}
            className="input-field"
          />
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
            className="input-field"
          />
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className="input-field"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="input-field"
          />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
            className="input-field"
          />
          {errors.dob && <p className="error">{errors.dob.message}</p>}
        </div>

        <div className="form-group">
          <label>Specialty:</label>
          <input
            type="text"
            {...register("specialty", { required: "Specialty is required" })}
            className="input-field"
          />
          {errors.specialty && <p className="error">{errors.specialty.message}</p>}
        </div>

        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
            className="input-field"
          />
          {errors.city && <p className="error">{errors.city.message}</p>}
        </div>

        <div className="form-group">
          <label>State/Province:</label>
          <input
            type="text"
            {...register("state", { required: "State/Province is required" })}
            className="input-field"
          />
          {errors.state && <p className="error">{errors.state.message}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
            className="input-field"
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input type="radio" value="Male" {...register("gender", { required: "Gender is required" })} />
              Male
            </label>
            <label>
              <input type="radio" value="Female" {...register("gender", { required: "Gender is required" })} />
              Female
            </label>
          </div>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>

        <div className="form-group">
          <label>Doctor Photo:</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "Doctor photo is required" })}
            className="input-field"
            onChange={handleImageChange}
          />
          {errors.photo && <p className="error">{errors.photo.message}</p>}
          {previewImage && (
            <img src={previewImage} alt="Doctor Preview" className="image-preview" />
          )}
        </div>

        <button type="submit" className="submit-button">
          Add Doctor
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddDoctorForm;