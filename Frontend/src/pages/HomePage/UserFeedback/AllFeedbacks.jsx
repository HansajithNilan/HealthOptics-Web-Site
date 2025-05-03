import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/footer';
import './AllFeedback.css';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import allfeedbackImage from '../../../assets/new feedback2.jpg';
import { IoChevronBackCircleSharp } from "react-icons/io5";
=======
import allfeedbackImage from '../../../assets/allfeedbackimage21.jpg';
>>>>>>> 9ca2a4e (Minor Updates)

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/feedback/all');
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
    <div className="AllFeedbacks-page">
      <NavBar />
      <section className="AllFeedbacks-container">
        <div className="AllFeedbacks-hero">
          <img src={allfeedbackImage} alt="All Feedbacks Banner" />
          <div className="AllFeedbacks-hero-overlay">
            <h1>Customer Feedback</h1>
            <p>See what our customers have to say about us</p>
          </div>
        </div>

        <div className="AllFeedbacks-wrapper">
          <div className="AllFeedbacks-header">
            <div className="AllFeedbacks-search-container">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="AllFeedbacks-search-input"
              />
            </div>
            <button className="AllFeedbacks-back-btn" onClick={() => navigate('/feedback')}>
<<<<<<< HEAD
            <IoChevronBackCircleSharp />   Back Feedback Form
=======
              Return to Feedback Form
>>>>>>> 9ca2a4e (Minor Updates)
            </button>
          </div>

          <div className="AllFeedbacks-grid">
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback) => (
                <div key={feedback._id} className="AllFeedbacks-card">
                  <div className="AllFeedbacks-card-header">
                    <div className="AllFeedbacks-user-details">
                      <h3>{feedback.name}</h3>
                      <p className="AllFeedbacks-user-email">{feedback.email}</p>
                    </div>
                    <span className="AllFeedbacks-card-date">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="AllFeedbacks-card-rating">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < feedback.rating ? '#f39c12' : '#d3d3d3'}
                        size={22}
                      />
                    ))}
                    <span>({feedback.rating}/5)</span>
                  </div>
                  <p className="AllFeedbacks-card-comment">{feedback.additionalComment}</p>
                </div>
              ))
            ) : (
              <p className="AllFeedbacks-no-feedback">No feedback matches your search criteria.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AllFeedbacks;