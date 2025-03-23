import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  emergency: {
    type: String,
    required: true,
  },
});

const PatientModel = mongoose.model("Patient", patientSchema);
export default PatientModel;
