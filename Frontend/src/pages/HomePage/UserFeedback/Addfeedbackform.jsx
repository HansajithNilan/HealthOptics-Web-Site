import React, { useState, useEffect, useContext } from 'react';
import { FaStar, FaEdit, FaTrash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../components/Context/AuthContext';
import './Addfeedbackform.css';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/footer';
import feedbackImage from '../../../assets/feedbacksimage.jpg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FeedbackForm = () => {
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
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    }
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback/all');
      const userFeedbacks = response.data.filter((feedback) => feedback.email === email);
      setFeedbacks(userFeedbacks);
    } catch (error) {
      toast.error('Error fetching feedbacks');
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

    if (!localStorage.getItem('accessToken')) {
      return Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please log in to submit feedback.',
      });
    }

    if (!formData.name || !formData.email || !formData.rating || !formData.additionalComment) {
      return Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
      });
    }

    if (!formData.consent) {
      return Swal.fire({
        icon: 'warning',
        title: 'Consent Required',
        text: 'Please provide consent to submit feedback.',
      });
    }

    try {
      const config = getAuthConfig();
      const feedbackData = { ...formData, rating: Number(formData.rating), userId: id };

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/feedback/update/${editId}`, feedbackData, config);
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Feedback updated successfully.' });
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/feedback/create', feedbackData, config);
        Swal.fire({ icon: 'success', title: 'Thank You!', text: 'Feedback submitted successfully.' });
      }

      setFormData({ name: name || '', email: email || '', rating: 0, additionalComment: '', consent: false });
      fetchFeedbacks();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to submit feedback.',
      });
    }
  };

  const handleEdit = (feedback) => {
    if (!localStorage.getItem('accessToken')) {
      return Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please log in to edit feedback.',
      });
    }
    setIsEditing(true);
    setEditId(feedback._id);
    setFormData({ ...feedback, consent: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (feedbackId) => {
    if (!localStorage.getItem('accessToken')) {
      return Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please log in to delete feedback.',
      });
    }

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
        await axios.delete(`http://localhost:5000/api/feedback/delete/${feedbackId}`, config);
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
      return Swal.fire({
        icon: 'error',
        title: 'Not Supported',
        text: 'Speech recognition is not supported in your browser.',
      });
    }
    if (isListening) recognition.stop();
    else recognition.start();
    setIsListening(!isListening);
  };

  return (
    <div className="ADDFBfeedback-page">
      <NavBar />
      <section className="ADDFBfeedback-container">
        <div className="ADDFBfeedback-hero">
          <img src={feedbackImage} alt="Feedback Banner" />
          <div className="ADDFBhero-overlay">
            <h1>Your Feedback Matters</h1>
            <p>Share your experience to help us improve our services.</p>
          </div>
        </div>

        <div className="ADDFBfeedback-content">
          <form onSubmit={handleSubmit} className="ADDFBfeedback-form">
            <h2 className="ADDFBform-title">{isEditing ? 'Edit Feedback' : 'Add Feedback'}</h2>

            <label className="ADDFBform-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="ADDFBform-input"
              required
            />

            <label className="ADDFBform-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="ADDFBform-input"
              required
            />

            <label className="ADDFBform-label">Rating</label>
            <div className="ADDFBrating-section">
              <p className="ADDFBrating-text">How would you rate our service?</p>
              <div className="ADDFBstar-rating">
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
                        className="ADDFBstar"
                        color={ratingValue <= (hover || formData.rating) ? '#ffca28' : '#e0e0e0'}
                        size={28}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <label className="ADDFBform-label">Comments</label>
            <div className="ADDFBcomment-section">
              <textarea
                name="additionalComment"
                value={formData.additionalComment}
                onChange={handleChange}
                placeholder="Share your thoughts or use the microphone"
                className="ADDFBform-textarea"
                required
              />
              <button
                type="button"
                onClick={toggleListening}
                className={`ADDFBmic-btn ${isListening ? 'active' : ''}`}
                title={isListening ? 'Stop recording' : 'Start recording'}
              >
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
            </div>

            <label className="ADDFBconsent-label">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              I consent to the storage and handling of my data.
            </label>

            <div className="ADDFBform-actions">
              <button type="button" className="ADDFBview-btn" onClick={() => navigate('/all-feedbacks')}>
                View All Feedback
              </button>
              <button type="submit" className="ADDFBsubmit-btn">
                {isEditing ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>

          <div className="ADDFBfeedback-list">
            {feedbacks.map((feedback) => (
              <div key={feedback._id} className="ADDFBfeedback-item">
                <div className="ADDFBfeedback-header">
                  <h3>{feedback.name}</h3>
                  <span className="ADDFBfeedback-date">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="ADDFBfeedback-rating">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      color={index < feedback.rating ? '#ffca28' : '#e0e0e0'}
                      size={20}
                    />
                  ))}
                  <span> ({feedback.rating}/5)</span>
                </div>
                <p>{feedback.additionalComment}</p>
                {feedback.email === email && (
                  <div className="ADDFBfeedback-controls">
                    <button className="ADDFBedit-btn" onClick={() => handleEdit(feedback)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="ADDFBdelete-btn" onClick={() => handleDelete(feedback._id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FeedbackForm;