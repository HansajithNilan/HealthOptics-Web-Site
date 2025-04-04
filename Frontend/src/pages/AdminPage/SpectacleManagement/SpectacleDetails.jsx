import React from "react";
import { FaTimes, FaEraser } from "react-icons/fa";

const SpectacleDetails = ({ spectacle, onClose }) => {
  if (!spectacle) return null;

  return (
    <div className="shakya-modal-overlay">
      <div className="shakya-modal-content">
               <div>
                  <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                  </button>
                </div>
        <h2>{spectacle.model} - Details</h2>
        <p><strong>Type:</strong> {spectacle.type}</p>
        <p><strong>Brand:</strong> {spectacle.brand}</p>
        <p><strong>Gender:</strong> {spectacle.gender}</p>
        <p><strong>Frame Shape:</strong> {spectacle.frameshape}</p>
        <p><strong>Frame Material:</strong> {spectacle.framematerial}</p>
        <p><strong>Frame Type:</strong> {spectacle.frametype}</p>
        <p><strong>Hinge Type:</strong> {spectacle.hingetype}</p>
        <p><strong>Description:</strong> {spectacle.discription}</p>
        <p><strong>Frame Sizes Available:</strong> {`${spectacle.framesize1}, ${spectacle.framesize2}, ${spectacle.framesize3}`}</p>
        <p><strong>Price:</strong> ${spectacle.price.toLocaleString()}</p>
        <p><strong>Rating:</strong> {spectacle.rating}</p>
        <p><strong>Stock Quantity:</strong> {spectacle.stock}</p>
      </div>
    </div>
  );
};

export default SpectacleDetails;
