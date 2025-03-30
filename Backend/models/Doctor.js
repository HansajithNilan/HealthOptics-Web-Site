import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  dob: { type: String, required: true },
  specialty: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  photo: { type: String }, // Ensure the photo field exists
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);