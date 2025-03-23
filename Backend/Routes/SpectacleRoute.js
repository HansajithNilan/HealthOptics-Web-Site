import express from "express";


import { ensureAuthenticated } from "../middlewares/ensureAuth.js";
import { adminAuthorized } from "../middlewares/adminlogin.js";

import { 
    createSpectacle, 
    getAllSpectacles, 
    getSpectacleById, 
    updateSpectacle, 
    deleteSpectacle 
} from "../Controllers/SpectacleController.js";

const router = express.Router();

// Create a spectacle stock (Admin only)
// router.post("/add", ensureAuthenticated, adminAuthorized(), createSpectacle);
router.post("/add", createSpectacle);


// Get all spectacles
router.get("/", getAllSpectacles);

// Get single spectacle by ID
router.get("/:id", getSpectacleById);

// Update a spectacle stock (Admin only)
// router.put("/:id", ensureAuthenticated, adminAuthorized(), updateSpectacle);
router.put("/update/:id", updateSpectacle);

// Delete a spectacle stock (Admin only)
// router.delete("/:id", ensureAuthenticated, adminAuthorized(), deleteSpectacle);
router.delete("/delete/:id",deleteSpectacle);

export default router;