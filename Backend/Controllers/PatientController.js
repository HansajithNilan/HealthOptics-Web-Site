import PatientModel from "../models/PatientModel.js";

export const createPatient = async (req, res) => {
  try {
    const { fname, lname, age, dob, gender, phone, address, emergency } = req.body;

    if (!fname || !lname || !age || !dob || !gender || !phone || !address || !emergency) {
      return res.status(422).json({ message: "Please fill all fields" });
    }

    const patient = await PatientModel.create({
      fname,
      lname,
      age,
      dob,
      gender,
      phone,
      address,
      emergency,
    });

    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find();

    if (!patients) {
      return res.status(422).json({ message: "Patients not found!" });
    }

    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPatient = await PatientModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    return res.status(200).json(updatedPatient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await PatientModel.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    return res.status(200).json({ message: "Patient deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
