import SpectacleModel from "../models/Spectacle.js";

// Get All Spectacles 
export const getAllSpectacles = async (req, res) => {
    try {
        const spectacles = await SpectacleModel.find();
        res.status(200).json(spectacles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a single spectacle by ID
export const getSpectacleById = async (req, res) => {
    try {
        const spectacle = await SpectacleModel.findById(req.params.id);
        if (!spectacle) return res.status(404).json({ message: "Spectacle not found" });
        res.status(200).json(spectacle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Admin - Create a new spectacle stock entry 
export const createSpectacle = async (req, res) => {
    console.log(req.body);
    try {
        const newSpectacle = new SpectacleModel(req.body);
        await newSpectacle.save();
        res.status(201).json({ message: "Spectacle added successfully", spectacle: newSpectacle });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin - Update a spectacle stock
export const updateSpectacle = async (req, res) => {
    try {
        const updatedSpectacle = await SpectacleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSpectacle) return res.status(404).json({ message: "Spectacle not found" });
        res.status(200).json({ message: "Spectacle updated successfully", spectacle: updatedSpectacle });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Admin -  Delete a Spectacle 
export const deleteSpectacle = async (req, res) => {
    try {
        const deletedSpectacle = await SpectacleModel.findByIdAndDelete(req.params.id);
        if (!deletedSpectacle) return res.status(404).json({ message: "Spectacle not found" });
        res.status(200).json({ message: "Spectacle deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
