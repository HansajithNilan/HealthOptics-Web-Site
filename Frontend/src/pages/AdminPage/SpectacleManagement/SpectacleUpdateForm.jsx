import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes, FaEraser } from "react-icons/fa";
import "./SpectacleForm.css";

const SpectacleUpdateForm = ({ onClose, spectacle, onUpdate }) => {
  const [step, setStep] = useState(1);
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
    framesizes: ["", "", ""],
    price: "",
    colors: [
      { name: "", imageUrls: "" },
      { name: "", imageUrls: "" },
      { name: "", imageUrls: "" },
    ],
    variants: [],
  });

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
        framesizes: [
          spectacle.framesize1 || "",
          spectacle.framesize2 || "",
          spectacle.framesize3 || "",
        ],
        price: spectacle.price || "",
        colors: [
          {
            name: spectacle.variants?.[0]?.color || "",
            imageUrls: Array.isArray(spectacle.imageurlcolor1)
              ? spectacle.imageurlcolor1.join(", ")
              : spectacle.imageurlcolor1 || "",
          },
          {
            name: spectacle.variants?.[1]?.color || "",
            imageUrls: Array.isArray(spectacle.imageurlcolor2)
              ? spectacle.imageurlcolor2.join(", ")
              : spectacle.imageurlcolor2 || "",
          },
          {
            name: spectacle.variants?.[2]?.color || "",
            imageUrls: Array.isArray(spectacle.imageurlcolor3)
              ? spectacle.imageurlcolor3.join(", ")
              : spectacle.imageurlcolor3 || "",
          },
        ],
        variants: spectacle.variants || [],
      });
    }
  }, [spectacle]);

  const validateStep1 = () => {
    const requiredFields = [
      "model",
      "type",
      "brand",
      "gender",
      "frameshape",
      "framematerial",
      "frametype",
      "hingetype",
      "description",
      "price",
    ];

    if (requiredFields.some((field) => !formData[field])) {
      Swal.fire("Error!", "All required fields must be filled.", "error");
      return false;
    }

    if (!formData.framesizes.some((size) => size)) {
      Swal.fire("Error!", "At least one frame size must be filled.", "error");
      return false;
    }

    const sizeFormatRegex = /^\d{2}-\d{2}-\d{3}$/;
    const isValidSize = formData.framesizes.every((size) => {
      if (!size) return true; // Skip empty ones (already checked one exists)
      if (!sizeFormatRegex.test(size)) return false;

      const [lens, bridge, temple] = size.split("-").map(Number);
      return (
        lens >= 40 &&
        lens <= 70 &&
        bridge >= 10 &&
        bridge <= 25 &&
        temple >= 120 &&
        temple <= 160
      );
    });

    if (!isValidSize) {
      Swal.fire(
        "Error!",
        "One or more frame sizes are in an invalid format or range (e.g. 55-14-135).",
        "error"
      );
      return false;
    }

    if (formData.price <= 0 || isNaN(formData.price)) {
      Swal.fire("Error!", "Price must be a positive number.", "error");
      return false;
    }

    if (!formData.colors.some((color) => color.name)) {
      Swal.fire("Error!", "At least one color name must be filled.", "error");
      return false;
    }

    const wordCount = formData.description.trim().split(/\s+/).length;
    if (wordCount > maxDescriptionWords) {
      Swal.fire(
        "Error!",
        `Description must not exceed ${maxDescriptionWords} words.`,
        "error"
      );
    }
    return true;
  };

  const maxDescriptionWords = 45;
  const [descriptionWarning, setDescriptionWarning] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      const wordCount = value.trim().split(/\s+/).length;

      if (wordCount > maxDescriptionWords) {
        setDescriptionWarning(
          `Description cannot exceed ${maxDescriptionWords} words. Currently: ${wordCount}`
        );
      } else {
        setDescriptionWarning("");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFrameSizeChange = (index, value) => {
    const newSizes = [...formData.framesizes];
    newSizes[index] = value;
    setFormData((prev) => ({ ...prev, framesizes: newSizes }));
  };

  const handleColorChange = (index, field, value) => {
    const newColors = [...formData.colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setFormData((prev) => ({ ...prev, colors: newColors }));
  };

  const handleVariantChange = (index, value) => {
    const newVariants = [...formData.variants];
    newVariants[index].stock = value >= 0 ? value : 0;
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    // Generate or update variants based on framesizes and colors
    const validSizes = formData.framesizes.filter((size) => size);
    const validColors = formData.colors.filter((color) => color.name);
    const newVariants = [];

    validSizes.forEach((size) => {
      validColors.forEach((color) => {
        const existingVariant = formData.variants.find(
          (v) => v.framesize === size && v.color === color.name
        );
        newVariants.push({
          framesize: size,
          color: color.name,
          stock: existingVariant ? existingVariant.stock : 0,
        });
      });
    });

    setFormData((prev) => ({ ...prev, variants: newVariants }));
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalStock = formData.variants.reduce(
      (sum, variant) => sum + Number(variant.stock),
      0
    );

    const payload = {
      ...formData,
      framesize1: formData.framesizes[0],
      framesize2: formData.framesizes[1],
      framesize3: formData.framesizes[2],
      imageurlcolor1: formData.colors[0].imageUrls
        .split(",")
        .map((url) => url.trim()),
      imageurlcolor2: formData.colors[1].imageUrls
        .split(",")
        .map((url) => url.trim()),
      imageurlcolor3: formData.colors[2].imageUrls
        .split(",")
        .map((url) => url.trim()),
      stock: totalStock,
      variants: formData.variants,
    };

    axios
      .put(
        `http://localhost:5000/api/spectacle/update/${spectacle._id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        Swal.fire("Success!", "Spectacle has been updated!", "success");
        onUpdate(response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating spectacle:", error);
        Swal.fire(
          "Error!",
          "There was an error updating the spectacle.",
          "error"
        );
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
      framesizes: ["", "", ""],
      price: "",
      colors: [
        { name: "", imageUrls: "" },
        { name: "", imageUrls: "" },
        { name: "", imageUrls: "" },
      ],
      variants: [],
    });
    setStep(1);
  };

  const [showFrameSizeHint, setShowFrameSizeHint] = useState(false);

  return (
    <div>
      {step === 1 ? (
        <div className="shakya-add-spectacle-form">
          <form onSubmit={handleNext}>
            <div className="close-btn">
              <button className="shakya-close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <h2>Edit Spectacle</h2>

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
              {/* Frame Sizes */}
              <label>Frame Sizes</label>
              {[0, 1, 2].map((index) => (
                <input
                  key={index}
                  type="text"
                  value={formData.framesizes[index]}
                  onChange={(e) => {
                    handleFrameSizeChange(index, e.target.value);
                    setShowFrameSizeHint(true);
                  }}
                  onBlur={() => setShowFrameSizeHint(false)} // Hide when focus leaves
                  placeholder="L-B-T (e.g. 55-14-135)"
                />
              ))}

              {/* Show hint when typing */}
              {showFrameSizeHint && (
                <p
                  style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}
                >
                  Range - Lens: 40–70 mm, Bridge: 10–25 mm, Temple: 120–160 mm
                </p>
              )}
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
              <label>Colors & Image URLs</label>
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={formData.colors[index].name}
                    onChange={(e) =>
                      handleColorChange(index, "name", e.target.value)
                    }
                    placeholder={`Color ${index + 1} Name`}
                  />
                  <input
                    type="text"
                    value={formData.colors[index].imageUrls}
                    onChange={(e) =>
                      handleColorChange(index, "imageUrls", e.target.value)
                    }
                    placeholder={`Color ${index + 1} URLs (comma-separated)`}
                  />
                </div>
              ))}
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
              {descriptionWarning && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {descriptionWarning}
                </p>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="clear-btn" onClick={handleClear}>
                <FaEraser /> Clear
              </button>
              <button type="submit" className="submit-btn">
                Next
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="shakya-variants-stock-form">
          <form onSubmit={handleSubmit}>
            <div className="close-btn">
              <button className="shakya-close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <h2>Edit Spectacle Stock Variants</h2>

            <div>
              <label>
                Total Stock:{" "}
                {formData.variants.reduce((sum, v) => sum + Number(v.stock), 0)}
              </label>
            </div>

            <div>
              {formData.variants.map((variant, index) => (
                <div key={index} className="variant-section">
                  <label>
                    <span>{variant.color}</span>
                    <span>{variant.framesize}</span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={variant.stock}
                    onChange={(e) => handleVariantChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="clear-btn"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button type="submit" className="submit-btn">
                Update Spectacle
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SpectacleUpdateForm;
