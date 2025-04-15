import { useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import "./Spectacles.css";

const SpectacleTryOn = ({ spectacle, onClose }) => {
  console.log("SpectacleTryOn rendering with:", spectacle);
  if (!spectacle) return null;

  // State to manage the currently selected image
  const [selectedImage, setSelectedImage] = useState(
    spectacle.imageurlcolor1?.[0] || ""
  );

  // Define image URLs and their corresponding colors
  const colorImages = [
    {
      color: "Black",
      url: spectacle.imageurlcolor1?.[0] || "",
    },
    {
      color: "Gold",
      url: spectacle.imageurlcolor2?.[0] || "",
    },
    // Add more colors if imageurlcolor3 is populated
    ...(spectacle.imageurlcolor3?.[0]
      ? [{ color: "Other", url: spectacle.imageurlcolor3[0] }]
      : []),
  ].filter((item) => item.url && item.url !== ""); // Filter out empty URLs

  // Handle image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="shakya-spectacle-try-on-modal">
      <div className="shakya-spectacle-try-on-container">
        <div className="try-on-close-btn">
          <button className="shakya-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div>
          <h2>Choose Your Favorite Look</h2>
        </div>
        <div className="try-on-grid">
          <div>
            <div className="modal-spectacle-details">
              <h3>{spectacle.model}</h3>
              <p className="modal-spectacle-brand">
                <span>{spectacle.brand}</span>
              </p>
              <p className="spectacle-gender-type">
                <span>{spectacle.type}</span>
                <span>{spectacle.gender}</span>
              </p>
            </div>
            {/* Small Images with Color Names */}
            {/* <div className="shakya-small-images-container">
              {colorImages.length > 0 ? (
                colorImages.map((item, index) => (
                  <div
                    key={index}
                    className="small-image-item"
                    onClick={() => handleImageClick(item.url)}
                  >
                    <img
                      src={item.url}
                      alt={`${spectacle.model} ${item.color}`}
                      className="try-on-small-image"
                    />
                    <p>{item.color}</p>
                  </div>
                ))
              ) : (
                <p>No available images</p>
              )}
            </div> */}
             <div className="shakya-small-images-container">
  {colorImages.length > 0 ? (
    colorImages.map((item, index) => (
      <div
        key={index}
        className={`small-image-item ${selectedImage === item.url ? "active" : ""}`}
        onClick={() => handleImageClick(item.url)}
      >
        <img
          src={item.url}
          alt={`${spectacle.model} ${item.color}`}
          className="try-on-small-image"
        />
        <p>{item.color}</p>
      </div>
    ))
  ) : (
    <p>No available images</p>
  )}
</div>
          </div>

          <div>
            {/* Large Image Display */}
            <div className="shakya-large-image-container">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={`${spectacle.model} large`}
                  className="try-on-large-image"
                />
              ) : (
                <p>No image selected</p>
              )}
            </div>
            <div className="shakya-try-on-btn">
            <button onClick={() => console.log("Selected image for try-on:", selectedImage)}>
                <FaCamera style={{ marginRight: "10px" }} />
                TRY ON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpectacleTryOn;
