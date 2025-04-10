import { React, useState } from "react";
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

        <h2>{spectacle.model}</h2>
        <div className="shakya-detail-modal-grid">
          <div>
            <p>
              <strong>Type:</strong> {spectacle.type}
            </p>
            <p>
              <strong>Brand:</strong> {spectacle.brand}
            </p>
            <p>
              <strong>Gender:</strong> {spectacle.gender}
            </p>
            <p>
              <strong>Frame Shape:</strong> {spectacle.frameshape}
            </p>
            <p>
              <strong>Frame Material:</strong> {spectacle.framematerial}
            </p>
            <p>
              <strong>Frame Type:</strong> {spectacle.frametype}
            </p>
            <p>
              <strong>Hinge Type:</strong> {spectacle.hingetype}
            </p>
            {/* <p><strong>Description:</strong> {spectacle.description || 'N/A'}</p>  */}
            <p>
              <strong>Price:</strong> LKR {spectacle.price.toLocaleString()}
            </p>
            <p>
              <strong>Rating:</strong> {spectacle.rating || 0}
            </p>
            <p>
              <strong>Total Stock Quantity:</strong> {spectacle.stock || 0}
            </p>
          </div>

          <div>
            {/* Variant Details */}
            {spectacle.variants && spectacle.variants.length > 0 && (
              <div className="variant-details">
                <h3>Variant Stock Details</h3>
                <table className="variant-table">
                  <thead>
                    <tr>
                      <th>Frame Size</th>
                      <th>Color</th>
                      <th>Stock Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spectacle.variants.map((variant, index) => (
                      <tr key={index}>
                        <td>{variant.framesize}</td>
                        <td>{variant.color}</td>
                        <td>{variant.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpectacleDetails;
