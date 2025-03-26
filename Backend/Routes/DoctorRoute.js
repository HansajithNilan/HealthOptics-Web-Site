
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";
import DoctorAppointment from "../models/DoctorAppointment.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error('Only .jpg, .jpeg, and .png files are allowed'))
  }
}).single('photo');

;


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
    }});

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", (req, res) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError || err) {
      res.status(400).json({ message: err.message });
    } else {
      createDoctor(req, res);
    }
  });
});

router.put("/:id", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      const updatedData = { ...req.body, photo: req.file ? req.file.filename : undefined };
      updateDoctor(req, res, updatedData);

    }});

router.route('/editdoctorappointment/:id').put(async (req, res) =>{

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
});
router.delete("/:id", deleteDoctor);

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

router.route('/getalldoctorappointment/:email/:id').post(async(req, res) => {

    const id = req.params.id;

    try {
        
        const doctor = await DoctorAppointment.findById(id);

        if (!doctor) {
            return res.status(404).json({ status: "doctorAppointment not found" });
        }

        return res.status(200).json({status: "doctorAppointment is fetched", doctor});

    } catch (error) {
        
        return res.status(500).json({status: "Error with fetch doctorAppointment", message: error});

    }
});
export default router;

