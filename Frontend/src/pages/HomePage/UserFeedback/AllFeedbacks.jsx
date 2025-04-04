import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/footer';
import './AllFeedback.css';
import { useNavigate } from 'react-router-dom';
import allfeedbackImage from '../../../assets/allfeedbackimage.jpg';

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback/all');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="AFBfeedback-page">
      <NavBar />
      <section className="AFBfeedback-container">
        <div className="AFBfeedback-hero">
          <img src={allfeedbackImage} alt="All Feedbacks Banner" />
          <div className="AFBhero-overlay">
            <h1>All Customer Feedback</h1>
            <p>Discover what our customers are saying about us</p>
          </div>
        </div>

        <div className="AFBall-feedbacks-wrapper">
          <div className="AFBfeedback-header">
            <div className="AFBsearch-container">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="AFBsearch-input"
              />
            </div>
            <button className="AFBback-btn" onClick={() => navigate('/feedback')}>
              Back to Feedback Form
            </button>
          </div>

          <div className="AFBfeedback-grid">
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback) => (
                <div key={feedback._id} className="AFBfeedback-card">
                  <div className="AFBcard-header">
                    <div className="AFBuser-details">
                      <h3>{feedback.name}</h3>
                      <p className="AFBuser-email">{feedback.email}</p>
                    </div>
                    <span className="AFBcard-date">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="AFBcard-rating">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < feedback.rating ? '#ffca28' : '#e0e0e0'}
                        size={20}
                      />
                    ))}
                    <span>({feedback.rating}/5)</span>
                  </div>
                  <p className="AFBcard-comment">{feedback.additionalComment}</p>
                </div>
              ))
            ) : (
              <p className="AFBno-feedback">No feedback matches your search.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AllFeedbacks;