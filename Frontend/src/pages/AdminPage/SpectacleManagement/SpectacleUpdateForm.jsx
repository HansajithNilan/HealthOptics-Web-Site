import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes, FaEraser } from "react-icons/fa";
import "./SpectacleForm.css"; // Reuse the same CSS for consistency

const SpectacleUpdateForm = ({ onClose, spectacle, onUpdate }) => {
  const [formData, setFormData] = useState({
    model: "",
    type: "",
    brand: "",
    gender: "",
    frameshape: "",
    framematerial: "",
    frametype: "",
    hingetype: "",
    description: "",
    framesize1: "",
    framesize2: "",
    framesize3: "",
    price: "",
    stock: "",
    rating: "",
    imageurlcolor1: "",
    imageurlcolor2: "",
    imageurlcolor3: "",
  });

  // Prefill the form with the current spectacle data
  useEffect(() => {
    if (spectacle) {
      setFormData({
        model: spectacle.model || "",
        type: spectacle.type || "",
        brand: spectacle.brand || "",
        gender: spectacle.gender || "",
        frameshape: spectacle.frameshape || "",
        framematerial: spectacle.framematerial || "",
        frametype: spectacle.frametype || "",
        hingetype: spectacle.hingetype || "",
        description: spectacle.description || "",
        framesize1: spectacle.framesize1 || "",
        framesize2: spectacle.framesize2 || "",
        framesize3: spectacle.framesize3 || "",
        price: spectacle.price || "",
        stock: spectacle.stock || "",
        rating: spectacle.rating || "",
        imageurlcolor1: Array.isArray(spectacle.imageurlcolor1)
          ? spectacle.imageurlcolor1.join(", ")
          : spectacle.imageurlcolor1 || "",
        imageurlcolor2: Array.isArray(spectacle.imageurlcolor2)
          ? spectacle.imageurlcolor2.join(", ")
          : spectacle.imageurlcolor2 || "",
        imageurlcolor3: Array.isArray(spectacle.imageurlcolor3)
          ? spectacle.imageurlcolor3.join(", ")
          : spectacle.imageurlcolor3 || "",
      });
    }
  }, [spectacle]);

  const validateForm = () => {
    if (
      !formData.model ||
      !formData.type ||
      !formData.brand ||
      !formData.gender ||
      !formData.frameshape ||
      !formData.framematerial ||
      !formData.frametype ||
      !formData.hingetype ||
      !formData.description
    ) {
      Swal.fire("Error!", "All fields are required except image URLs.", "error");
      return false;
    }

    if (!formData.framesize1 && !formData.framesize2 && !formData.framesize3) {
      Swal.fire("Error!", "At least one frame size must be filled.", "error");
      return false;
    }

    if (formData.price <= 0 || isNaN(formData.price)) {
      Swal.fire("Error!", "Price must be a positive number.", "error");
      return false;
    }

    if (formData.stock < 0 || isNaN(formData.stock)) {
      Swal.fire("Error!", "Stock must be a non-negative number.", "error");
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedFormData = {
      ...formData,
      imageurlcolor1: formData.imageurlcolor1
        ? formData.imageurlcolor1.split(",").map((url) => url.trim())
        : [],
      imageurlcolor2: formData.imageurlcolor2
        ? formData.imageurlcolor2.split(",").map((url) => url.trim())
        : [],
      imageurlcolor3: formData.imageurlcolor3
        ? formData.imageurlcolor3.split(",").map((url) => url.trim())
        : [],
    };

    axios
      .put(`http://localhost:5000/api/spectacle/update/${spectacle._id}`, updatedFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Swal.fire("Success!", "Spectacle has been updated!", "success");
        onUpdate(response.data); // Pass updated data back to parent
        onClose();
      })
      .catch((error) => {
        console.error("Error updating spectacle:", error);
        Swal.fire("Error!", "There was an error updating the spectacle.", "error");
      });
  };

  const handleClear = () => {
    setFormData({
      model: "",
      type: "",
      brand: "",
      gender: "",
      frameshape: "",
      framematerial: "",
      frametype: "",
      hingetype: "",
      description: "",
      framesize1: "",
      framesize2: "",
      framesize3: "",
      price: "",
      stock: "",
      rating: "",
      imageurlcolor1: "",
      imageurlcolor2: "",
      imageurlcolor3: "",
    });
  };

  return (
    <div className="shakya-add-spectacle-form">
      <form onSubmit={handleSubmit}>
        <div className="close-btn">
          <button className="shakya-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div>
          <h2>Edit Spectacle</h2>
        </div>

        <div>
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Eyeglasses">Eyeglasses</option>
            <option value="Sunglasses">Sunglasses</option>
          </select>
        </div>
        <div>
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div>
          <label>Frame Shape</label>
          <input
            type="text"
            name="frameshape"
            value={formData.frameshape}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Frame Material</label>
          <input
            type="text"
            name="framematerial"
            value={formData.framematerial}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Frame Type</label>
          <input
            type="text"
            name="frametype"
            value={formData.frametype}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Hinge Type</label>
          <input
            type="text"
            name="hingetype"
            value={formData.hingetype}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Frame Sizes</label>
          <input
            type="text"
            name="framesize1"
            value={formData.framesize1}
            onChange={handleInputChange}
            placeholder="Size 1"
          />
          <input
            type="text"
            name="framesize2"
            value={formData.framesize2}
            onChange={handleInputChange}
            placeholder="Size 2"
          />
          <input
            type="text"
            name="framesize3"
            value={formData.framesize3}
            onChange={handleInputChange}
            placeholder="Size 3"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URLs</label>
          <input
            type="text"
            name="imageurlcolor1"
            value={formData.imageurlcolor1}
            onChange={handleInputChange}
            placeholder="Color 1 URLs (comma-separated)"
          />
          <input
            type="text"
            name="imageurlcolor2"
            value={formData.imageurlcolor2}
            onChange={handleInputChange}
            placeholder="Color 2 URLs (comma-separated)"
          />
          <input
            type="text"
            name="imageurlcolor3"
            value={formData.imageurlcolor3}
            onChange={handleInputChange}
            placeholder="Color 3 URLs (comma-separated)"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="6"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Update Spectacle
          </button>
          <button type="button" className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpectacleUpdateForm;