import Doctor from "../models/Doctor.js";

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    const formattedDoctors = doctors.map(doctor => {
      const doctorObj = doctor.toObject();
      if (doctorObj.photo) {
        doctorObj.photoUrl = `http://localhost:3000/uploads/${doctorObj.photo}`;
      }
      return doctorObj;
    });
    res.status(200).json(formattedDoctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new doctor profile
export const createDoctor = async (req, res) => {
  try {
    const { firstName, lastName, email, address, dob, specialty, city, state, phone, gender } = req.body;

    // Log the uploaded file information
    console.log('Uploaded file:', req.file);

    // Validate required fields
    if (!firstName || !lastName || !email || !address || !dob || !specialty || !city || !state || !phone || !gender) {
      console.error("Validation Error: Missing required fields", {
        firstName, lastName, email, address, dob, specialty, city, state, phone, gender
      });
      return res.status(400).json({ 
        message: "All fields are required",
        missingFields: { firstName, lastName, email, address, dob, specialty, city, state, phone, gender }
      });
    }

    const photo = req.file ? req.file.filename : null;

    // Check for existing doctor
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      console.error("Validation Error: Doctor with this email already exists");
      return res.status(400).json({ message: "A doctor with this email already exists" });
    }

    // Create new doctor
    const newDoctor = new Doctor({
      firstName,
      lastName,
      email,
      address,
      dob,
      specialty,
      city,
      state,
      phone,
      gender,
      photo
    });

    const savedDoctor = await newDoctor.save();
    
    // Return the complete doctor object with full photo URL
    const doctorResponse = savedDoctor.toObject();
    if (doctorResponse.photo) {
      doctorResponse.photoUrl = `http://localhost:3000/uploads/${doctorResponse.photo}`;
    }
    
    res.status(201).json({
      message: "Doctor created successfully",
      doctor: doctorResponse
    });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ 
      message: "Failed to create doctor profile",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Update a doctor profile by ID
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Include photo if uploaded
    if (req.file) {
      updatedData.photo = req.file.filename;
    }

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "address", "dob", "specialty", "city", "state", "phone", "gender"];
    for (const field of requiredFields) {
      if (!updatedData[field]) {
        return res.status(400).json({ message: `Field ${field} is required` });
      }
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Failed to update doctor profile", error: error.message });
  }
};

// Delete a doctor profile by ID
export const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
