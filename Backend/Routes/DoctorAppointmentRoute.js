import express from 'express';
const router = express.Router();

import DoctorAppointment from '../models/DoctorAppointment.js';

router.route('/createdoctorappointment').post(async(req, res) => {
    console.log("Request received to create doctor appointment:", req.body);
    const {
        firstname,
        lastname,
        date,
        gender,
        age,
        email,
        contact,
        address,
        emergency,
        doctor,
        doctorfee
    } = req.body;

    const newDoctorAppointment = new DoctorAppointment({
        firstname,
        lastname,
        date,
        gender,
        age,
        email,
        contact,
        address,
        emergency,
        doctor,
        doctorfee
    });

    try {
        await newDoctorAppointment.save();
        console.log("Doctor appointment created successfully:", newDoctorAppointment);
        return res.status(200).json({status: "DoctorAppointment is added successfully"});
    } catch (error) {
        console.error("Error creating doctor appointment:", error.message);
        return res.status(500).json({status: "Error with add DoctorAppointment", message: error.message});
    }
});

router.route('/getalldoctorappointment/:email').post(async(req, res) => {
    const email = req.params.email;

    try {
        const doctorAppointments = await DoctorAppointment.find({ email: email });

        if (!doctorAppointments) {
            return res.status(404).json({ status: "doctorAppointment not found" });
        }

        return res.status(200).json({status: "doctorAppointment is fetched", doctorAppointments});
    } catch (error) {
        return res.status(500).json({status: "Error with fetch doctorAppointment", message: error});
    }
});

router.route('/editdoctorappointment/:id').put(async (req, res) => {
    const doctorAppointmentID = req.params.id;

    const {
        firstname,
        lastname,
        date,
        gender,
        age,
        email,
        contact,
        address,
        emergency,
        doctor,
        doctorfee
    } = req.body;

    const doctorAppointment = {
        firstname,
        lastname,
        date,
        gender,
        age,
        email,
        contact,
        address,
        emergency,
        doctor,
        doctorfee
    }
    
    try {
        const updatedAppointment = await DoctorAppointment.findByIdAndUpdate(doctorAppointmentID , doctorAppointment, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ status: "DoctorAppointment not found" });
        }
        return res.status(200).json({ status: "DoctorAppointment updated", updatedAppointment });
    } catch (error) {
        return res.status(500).json({status: "Error with update DoctorAppointment", message: error});
    }
});

router.route('/deletedoctorappointment/:id').delete(async (req, res) => {
    const doctorAppointmentID = req.params.id;

    try {
        const deletedAppointment = await DoctorAppointment.findByIdAndDelete(doctorAppointmentID);
        if (!deletedAppointment) {
            return res.status(404).json({ status: "DoctorAppointment not found" });
        }
        return res.status(200).json({status : "DoctorAppointment is deleted"});
    } catch (error) {
        return res.status(400).json({status : "Error with delete DoctorAppointment", message : error});
    }
});

// Fix the route to fetch a single appointment by its ID
router.route('/getdoctorappointment/:id').get(async(req, res) => {
    const id = req.params.id;

    try {
        const doctorAppointment = await DoctorAppointment.findById(id);

        if (!doctorAppointment) {
            return res.status(404).json({ status: "DoctorAppointment not found" });
        }

        return res.status(200).json({ status: "DoctorAppointment fetched", doctorAppointment });
    } catch (error) {
        return res.status(500).json({ status: "Error with fetch DoctorAppointment", message: error });
    }
});

export default router;
