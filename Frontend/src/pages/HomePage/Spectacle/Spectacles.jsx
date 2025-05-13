import React, { useState, useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar.jsx";
import "./Spectacles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../stores/cart.jsx";
import Footer from "../../../components/Footer/footer.jsx";

import cartImage from "../../../assets/cartImage.png";
import Cartab from "../../CartTab/cartab.jsx";
import SpectacleTryOn from "./SpectaclesTryOn.jsx";

const Spectacles = () => {
 

  const dispatch = useDispatch();
  const [spectacles, setSpectacles] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {
    axios
      .get("http://localhost:3000/api/spectacle/")
      .then((response) => {
        setSpectacles(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the spectacles data:",
          error
        );
      });
  }, []);

  // Generate a random number
  const generateNumber = () => {
    return Math.floor(Math.random() * 1000);
  };

  // Navigate to reserve page with a generated number
  const handleShopNow = (id) => {
    const number = generateNumber();
    navigate(`/reservespectacles/${id}/${number}`);
  };

  /*
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="star">
          &#9733;
        </span>
      );
    }
    if (halfStar) {
      stars.push(
        <span key="half" className="star">
          &#189;
        </span>
      );
    }
    while (stars.length < 5) {
      stars.push(
        <span key={`empty-${stars.length}`} className="star empty">
          &#9733;
        </span>
      );
    }
    return stars;
  };
*/


  // Search and filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");

    // Handle Search and filter
    const filteredSpectacles = spectacles.filter((item) => {
      const [minPrice, maxPrice] = String(price).split("-").map(Number);
      return (
        (item.model.toLowerCase().includes(search.toLowerCase()) ||
          item.brand.toLowerCase().includes(search.toLowerCase())) &&
        (type === "" || item.type === type) &&
        (gender === "" || item.gender === gender) &&
        (price === "" ||
          (item.price >= minPrice && (maxPrice ? item.price <= maxPrice : true)))
      );
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedSpectacle, setSelectedSpectacle] = useState(null);
    
    const handleShowTryOn = (spectacle) => {
      setSelectedSpectacle(spectacle);
      setShowModal(true);
    };

    const handleCloseTryOn = (spectacle) => {
      setShowModal(false);
      setSelectedSpectacle(null);
    };

  return (
    <div>
      <NavBar />
     
    
      <div className="shakya-spectacle-grid-container">
        <Cartab/>
        <div className="shakya-spec-header">
        <h1>Discover Your Perfect Look</h1>
        <p>
        Discover style and comfort with our new spectacles, modern frames, timeless classics. Durable, high-quality materials offer clarity and style. See better, look your best.
        </p>
        </div>
        
        <div className="shakya-filter-section">
          <input
            type="text"
            placeholder="Search Model or Brand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Eyeglasses">Eyeglasses</option>
            <option value="Sunglasses">Sunglasses</option>
          </select>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">All Genders</option>
            <option value="Unisex">Unisex</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="">All Prices</option>
            <option value="5000-10000">LKR 5,000 - LKR 10,000</option>
            <option value="10000-15000">LKR 10,000 - LKR 15,000</option>
            <option value="15000-20000">LKR 15,000 - LKR 20,000</option>
            <option value="20000">Above LKR 20,000</option>
          </select>
        </div>



        <div className="shakya-spectacle-grid">
          {filteredSpectacles.map((spectacle) => (
            <div key={spectacle.id} className="shakya-spectacle-card">
              <img
                src={spectacle.imageurlcolor1?.[0]}
                alt={spectacle.model}
                className="spectacle-image"
              />
              <div className="spectacle-details">
                <h2 className="spectacle-model">{spectacle.model}</h2>
                <p className="spectacle-brand">
                  <span>{spectacle.brand}</span>
                  
                </p>
                <p className="spectacle-gender-type">
                <span>{spectacle.type}</span> 
                <span>{spectacle.gender}</span> 
                </p>
                {/* <p className="spectacle-price">LKR {spectacle.price}</p> */}
                <p className="spectacle-price">LKR {spectacle.price.toLocaleString()}</p>
                {/* <div className="spectacle-rating">
                  {renderStars(spectacle.rating)}
                </div> */}
                <div className="shakya-spectacle-button-section">
                  <button 
                  className="more-details-button"
                  onClick={() => handleShowTryOn(spectacle)}>
                    Try On
                  </button>
                  <button
                    className="shop-now-button"
                    onClick={() => handleShopNow(spectacle._id)}
                  >
                    Shop Now
                  </button>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SpectacleTryOn
          spectacle={selectedSpectacle}
          onClose={handleCloseTryOn}
        />
        <Footer />
    </div>
  );
};

export default Spectacles;
