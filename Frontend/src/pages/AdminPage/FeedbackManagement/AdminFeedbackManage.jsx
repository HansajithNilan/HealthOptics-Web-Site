import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import axios from "axios";
import { FaTrash, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import "./AdminFeedbackManage.css";

const AdminFeedbackManage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/feedback/all");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch feedbacks",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/feedback/admindelete/${id}`);
        Swal.fire("Deleted!", "Feedback has been deleted.", "success");
        fetchFeedbacks();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete feedback",
      });
    }
  };

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Feedback Management">
      <div className="feedback-admin-containerAFM">
        <div className="search-sectionAFM">
          <div className="search-wrapperAFM">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-inputAFM"
            />
          </div>
        </div>

        <div className="table-containerAFM">
          <table className="feedback-tableAFM">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => (
                  <tr key={feedback._id}>
                    <td>{feedback.name}</td>
                    <td>{feedback.email}</td>
                    <td>
                      <div className="rating-displayAFM">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            color={index < feedback.rating ? "#f59e0b" : "#d1d5db"}
                            size={18}
                          />
                        ))}
                        <span>({feedback.rating})</span>
                      </div>
                    </td>
                    <td>{feedback.additionalComment}</td>
                    <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(feedback._id)}
                        className="delete-btnAFM"
                        title="Delete Feedback"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-dataAFM">
                    No feedback found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminFeedbackManage;