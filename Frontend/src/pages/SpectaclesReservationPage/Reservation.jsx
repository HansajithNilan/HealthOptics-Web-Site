import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "./Reservation.css";
import ImageDoctor from "../../assets/doctor-cheking-image1.jpg";
import Footer from "../../components/Footer/footer.jsx";
import Contact from "../HomePage/contact/contact.jsx";

import spect_image_1 from "../../assets/spectacle_image_1.jpg";
import spect_image_2 from "../../assets/spectacle_image_2.jpg";
import spect_image_3 from "../../assets/spectacle_image_3.jpg";

function Reservation() {
  const [frametype, setFrameType] = useState(""); 
  const [framemeterial, setFramemeterial] = useState("");
  const [selectSize, setSelectSize] = useState(""); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1 

  const handleSizeChange = (event) => {
    setSelectSize(event.target.value);
  };

  
  useEffect(() => {
    if (selectedImage) {
      const timer = setTimeout(() => {
        setSelectedImage(null);
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [selectedImage]);


  const ImageRadioButtons = () => {
    const images = [
      { id: 1, src: spect_image_1, alt: "Spectacle 1" },
      { id: 2, src: spect_image_2, alt: "Spectacle 2" },
      { id: 3, src: spect_image_3, alt: "Spectacle 3" },
    ];

    return (
      <div className="image-radio-buttons">
        {images.map((image) => (
          <div
            key={image.id}
            className={`image-option ${
              selectedImage === image.src ? "selected" : ""
            }`}
            onClick={() => setSelectedImage(image.src)} // Store image src
          >
            <img src={image.src} alt={image.alt} className="image-choice" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="spectales-reservation-page">
      <NavBar />
      <div className="spectacles-section">
        <h1>Reserve your Spectacles</h1>
        <div className="reserve-main-section">
          <div className="Image-section">
            <img 
              src={selectedImage || ImageDoctor} 
              alt="Selected Spectacle" 
              className="image-reserve" 
            />
          </div>
          <div className="reserve-section">
            <form className="reserve-form">
              <h1>Personal Details</h1>
              <div className="name-mobnumber">
                <label>Name:</label>
                <input type="text" placeholder="Enter your name" />
                <label>Mobile Number:</label>
                <input type="text" placeholder="Enter your phone number" />
              </div>
              <div className="name-mobnumber">
                <label>Address:</label>
                <input type="text" placeholder="Enter your address" />
                <label>Email:</label>
                <input type="text" placeholder="Enter your email" />
              </div>

              <h1>Spectacle Details</h1>
              <div className="spectacle-frame-type-meterial">
                <label htmlFor="frameType">Frame Type:</label>
                <select
                  id="frameType"
                  value={frametype}
                  onChange={(e) => setFrameType(e.target.value)}
                >
                  <option value="">Select Frame Type</option>
                  <option value="half-rim">Half Rim</option>
                  <option value="full-rim">Full Rim</option>
                </select>

                <label htmlFor="frameMaterial">Frame Material:</label>
                <select
                  id="frameMaterial"
                  value={framemeterial}
                  onChange={(e) => setFramemeterial(e.target.value)}
                >
                  <option value="">Select Frame Material</option>
                  <option value="Metal">Metal</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Acetate">Acetate</option>
                </select>
              </div>
             <div className="spectacle-size-options-main">
             
              <div className="spectacle-size-options">
                 <h2>Select Spectacle Size</h2>
                <label>
                  <input
                    type="radio"
                    name="spectacleSize"
                    value="Small"
                    checked={selectSize === "Small"}
                    onChange={handleSizeChange}
                  />
                  Small
                </label>
                <label>
                  <input
                    type="radio"
                    name="spectacleSize"
                    value="Medium"
                    checked={selectSize === "Medium"}
                    onChange={handleSizeChange}
                  />
                  Medium
                </label>
                <label>
                  <input
                    type="radio"
                    name="spectacleSize"
                    value="Large"
                    checked={selectSize === "Large"}
                    onChange={handleSizeChange}
                  />
                  Large
                </label>
              </div>
              <div className="spectacles-quantity">
                <h2>Quantity :</h2>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}/>
              </div>
              </div>
              <h2>Select Spectacle Image</h2>
              <ImageRadioButtons />
            </form>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default Reservation;
