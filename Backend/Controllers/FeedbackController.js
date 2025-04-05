import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const { name, email, rating, additionalComment } = req.body;
    
    // Create feedback object
    const feedbackData = {
      name,
      email,
      rating: Number(rating),
      additionalComment
    };

    // Add userId if authenticated user
    if (req.user && req.user.id) {
      feedbackData.userId = req.user.id;
    }

    const feedback = new Feedback(feedbackData);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Feedback creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error('Update feedback error:', error);
    res.status(500).json({ message: "Error updating feedback" });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error('Delete feedback error:', error);
    res.status(500).json({ message: "Error deleting feedback" });
  }
};
