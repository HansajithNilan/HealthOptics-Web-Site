import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  additionalComment: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Changed from true to false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Feedback', feedbackSchema);
