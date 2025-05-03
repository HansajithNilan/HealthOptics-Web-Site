import React, { useState, useEffect, useContext } from 'react';
import { FaStar, FaEdit, FaTrash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../components/Context/AuthContext';
import './Addfeedbackform.css';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/footer';
import feedbackImage from '../../../assets/feedbacksimage20.jpg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Addfeedbackform = () => {
  const { id, name, email } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: name || '',
    email: email || '',
    rating: 0,
    additionalComment: '',
    consent: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [hover, setHover] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;

      speechRecognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setFormData((prev) => ({ ...prev, additionalComment: transcript }));
      };

      speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Speech recognition failed. Please try again.');
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    } else {
      toast.warn('Speech recognition is not supported in your browser.');
    }
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/feedback/all');
      const userFeedbacks = response.data.filter((feedback) => feedback.email === email);
      setFeedbacks(userFeedbacks);
    } catch (error) {
      toast.error('Failed to load feedbacks. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const getAuthConfig = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No authentication token found');
    return {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.rating || !formData.additionalComment || !formData.consent) {
      return Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields and provide consent.',
      });
    }

    try {
      const config = getAuthConfig();
      const feedbackData = { ...formData, rating: Number(formData.rating), userId: id };

      if (isEditing) {
        await axios.put(`http://localhost:3000/api/feedback/update/${editId}`, feedbackData, config);
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Feedback updated successfully.' });
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:3000/api/feedback/create', feedbackData, config);
        Swal.fire({ icon: 'success', title: 'Thank You!', text: 'Feedback submitted successfully.' });
      }

      setFormData({ name: name || '', email: email || '', rating: 0, additionalComment: '', consent: false });
      fetchFeedbacks();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  const handleEdit = (feedback) => {
    setIsEditing(true);
    setEditId(feedback._id);
    setFormData({ ...feedback, consent: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (feedbackId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const config = getAuthConfig();
        await axios.delete(`http://localhost:3000/api/feedback/delete/${feedbackId}`, config);
        Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Feedback has been removed.' });
        fetchFeedbacks();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to delete feedback.',
        });
      }
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      return toast.warn('Speech recognition is not supported in your browser.');
    }
    if (isListening) {
      recognition.stop();
      toast.info('Speech recognition stopped.');
    } else {
      recognition.start();
      toast.info('Speech recognition started.');
    }
    setIsListening(!isListening);
  };

  return (
    <div className="FeedbackForm-page">
      <NavBar />
      <section className="FeedbackForm-container">
        <div className="FeedbackForm-hero">
          <img src={feedbackImage} alt="Feedback Banner" />
          <div className="FeedbackForm-hero-overlay">
            <h1>We Value Your Feedback</h1>
            <p>Your insights help us enhance our services.</p>
          </div>
        </div>

        <div className="FeedbackForm-content">
          <form onSubmit={handleSubmit} className="FeedbackForm-form">
            <h2 className="FeedbackForm-title">{isEditing ? 'Edit Your Feedback' : 'Submit Feedback'}</h2>

            <div className="FeedbackForm-group">
              <label className="FeedbackForm-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="FeedbackForm-input"
                required
              />
            </div>

            <div className="FeedbackForm-group">
              <label className="FeedbackForm-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="FeedbackForm-input"
                required
              />
            </div>

            <div className="FeedbackForm-group">
              <label className="FeedbackForm-label">Rating</label>
              <div className="FeedbackForm-rating-section">
                <p className="FeedbackForm-rating-text">Rate our service:</p>
                <div className="FeedbackForm-star-rating">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                          checked={formData.rating === ratingValue}
                        />
                        <FaStar
                          className="FeedbackForm-star"
                          color={ratingValue <= (hover || formData.rating) ? '#f39c12' : '#d3d3d3'}
                          size={30}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="FeedbackForm-group">
              <label className="FeedbackForm-label">Comments</label>
              <div className="FeedbackForm-comment-section">
                <textarea
                  name="additionalComment"
                  value={formData.additionalComment}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  className="FeedbackForm-textarea"
                  required
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`FeedbackForm-mic-btn ${isListening ? 'FeedbackForm-listening' : ''}`}
                  title={isListening ? 'Stop recording' : 'Start recording'}
                >
                  {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>
              </div>
            </div>

            <div className="FeedbackForm-group FeedbackForm-consent-group">
              <label className="FeedbackForm-consent-label">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                />
                I agree to the storage and use of my data.
              </label>
            </div>

            <div className="FeedbackForm-actions">
              <button type="button" className="FeedbackForm-view-btn" onClick={() => navigate('/all-feedbacks')}>
                View Feedbacks
              </button>
              <button type="submit" className="FeedbackForm-submit-btn">
                {isEditing ? 'Update Feedback' : 'Submit Feedback'}
              </button>
            </div>
          </form>

          <div className="FeedbackForm-list">
           
            {feedbacks.length === 0 ? (
              <p className="FeedbackForm-no-feedback">No feedback submitted yet.</p>
            ) : (
              feedbacks.map((feedback) => (
                <div key={feedback._id} className="FeedbackForm-item">
                  <div className="FeedbackForm-header">
                    <h4>{feedback.name}</h4>
                    <span className="FeedbackForm-date">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="FeedbackForm-rating">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < feedback.rating ? '#f39c12' : '#d3d3d3'}
                        size={20}
                      />
                    ))}
                    <span> ({feedback.rating}/5)</span>
                  </div>
                  <p>{feedback.additionalComment}</p>
                  <div className="FeedbackForm-controls">
                    <button className="FeedbackForm-edit-btn" onClick={() => handleEdit(feedback)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="FeedbackForm-delete-btn" onClick={() => handleDelete(feedback._id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Addfeedbackform;