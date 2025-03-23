import express from "express";
import { createPatient, getPatients, updatePatient, deletePatient } from "../Controllers/PatientController.js";

const router = express.Router();

router.post("/createPatient", createPatient);
router.get("/getPatients", getPatients);
router.put("/updatePatient/:id", updatePatient);
router.delete("/deletePatient/:id", deletePatient);

export default router;
