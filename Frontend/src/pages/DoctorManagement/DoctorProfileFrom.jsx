import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar"; 
import "../../components/NavBar/NavBar.css"; 
import doctorImage from "../../assets/doctor-image.png";
import './DoctorProfileFrom.css';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';


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

    
    Swal.fire({
      title: '<strong>SUCCESS</strong>',
      icon: 'success',
      html: `
        <div style="text-align: left;">
          Thank you for your request.<br>
          Your doctor profile has been successfully added.<br>
          Click 'Continue' to view the doctor profile table.
        </div>
      `,
      confirmButtonText: 'Continue',
      confirmButtonColor: 'e32929',
      buttonsStyling: false,
      customClass: {
        popup: 'custom-swal-popup4617',
        title: 'custom-swal-title4617',
        confirmButton: 'custom-swal-confirm-button4617',
        content: 'custom-swal-content4617'
      },
      iconColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/doctorprofiletable");  // Redirect to the doctor profile table
      }
    });
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
    <div className="doctor-container4617">
     
      <div className="image-container4617">
        <img src={doctorImage} alt="Doctor" className="doctor-image4617" />
      </div>
    <div className="form-container4617">
      <h2 className="form-title4617">Add Doctor Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form4617">
        
        <div className="form-group4617">
          <label>First Name:</label>
          <input
            type="text"
            {...register("firstName", { required: "First Name is required" })}
            className="input-field4617"
          />
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
        </div>

        <div className="form-group4617">
          <label>Last Name:</label>
          <input
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
            className="input-field4617"
          />
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        </div>

        <div className="form-group4617">
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
            className="input-field4617"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group4617">
          <label>Address:</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="input-field4617"
          />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>

        <div className="form-group4617">
          <label>Date of Birth:</label>
          <input
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
            className="input-field4617"
          />
          {errors.dob && <p className="error">{errors.dob.message}</p>}
        </div>

        <div className="form-group4617">
          <label>Specialty:</label>
          <input
            type="text"
            {...register("specialty", { required: "Specialty is required" })}
            className="input-field4617"
          />
          {errors.specialty && <p className="error">{errors.specialty.message}</p>}
        </div>

        <div className="form-group4617">
          <label>City:</label>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
            className="input-field4617"
          />
          {errors.city && <p className="error">{errors.city.message}</p>}
        </div>

        <div className="form-group4617">
          <label>State/Province:</label>
          <input
            type="text"
            {...register("state", { required: "State/Province is required" })}
            className="input-field4617"
          />
          {errors.state && <p className="error">{errors.state.message}</p>}
        </div>

        <div className="form-group4617">
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
            className="input-field4617"
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        <div className="form-group4617">
          <label>Gender:</label>
          <div className="radio-group4617">
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

        <div className="form-group4617">
          <label>Doctor Photo:</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "Doctor photo is required" })}
            className="input-field4617"
            onChange={handleImageChange}
          />
          {errors.photo && <p className="error">{errors.photo.message}</p>}
          {previewImage && (
            <img src={previewImage} alt="Doctor Preview" className="image-preview4617" />
          )}
        </div>

        <button type="submit" className="submit-button4617">
          Add Doctor
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddDoctorForm;