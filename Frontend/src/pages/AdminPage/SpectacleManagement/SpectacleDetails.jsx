import React from "react";

const SpectacleDetails = ({ spectacle, onClose }) => {
  if (!spectacle) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
        <p><strong>Stock Quantity:</strong> N/A</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SpectacleDetails;
