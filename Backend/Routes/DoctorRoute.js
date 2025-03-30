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

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"));
  },
}).single("photo");

router.get("/", getDoctors); // Ensure this route is defined
router.get("/:id", getDoctorById);
router.post("/", (req, res) => {
  upload(req, res, function (err) {
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
      const updatedData = {
        ...req.body,
        photo: req.file ? req.file.filename : undefined,
      };
      updateDoctor(req, res, updatedData);
    }
  });
});
router.delete("/:id", deleteDoctor);

export default router;
