import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "./Reservation.css";
import Footer from "../../components/Footer/footer.jsx";
import Contact from "../HomePage/contact/contact.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './UpdateReservation.css';

function UpdateReservation() {
  const { id } = useParams();
  const fetchDataRef = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    address: "",
    email: "",
    brand: "",
    frameshape: "",
    imageurlcolor: "",
    framesize: "",
    frametype: "",
    framematerial: "",
    gender: "",
    quantity: 1,
    price: 0
  });

  const notifySuccess = () => toast.success("Reservation updated successfully!");
  const notifyError = (msg) => toast.error(`Error updating reservation: ${msg}`);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageurl1, setImageurl1] = useState(null);
  const [imageurl2, setImageurl2] = useState(null);
  const [imageurl3, setImageurl3] = useState(null);
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (e) => {
    setFormData({ ...formData, quantity: Number(e.target.value) });
  };

  useEffect(() => {
    if (fetchDataRef.current) return;
    fetchDataRef.current = true;

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/auth/reservation/getonereservation/${id}`);
        const data = res.data;

        setImageurl1(data.imageurlcolor1);
        setImageurl2(data.imageurlcolor2);
        setImageurl3(data.imageurlcolor3);
        setBasePrice(Number(data.price) || 0);
        setSelectedImage((prev) => prev || data.imageurlcolor || data.imageurlcolor1);


        setFormData({
          name: data.name || "",
          phonenumber: data.phonenumber || "",
          address: data.address || "",
          email: data.email || "",
          brand: data.brand || "",
          frameshape: data.frameshape || "",
          imageurlcolor: data.imageurlcolor || "",
          framesize: data.framesize || "",
          frametype: data.frametype || "",
          framematerial: data.framematerial || "",
          gender: data.gender || "",
          quantity: data.quantity || 1,
          price: Number(data.price) || 0
        });

      } catch (err) {
        console.error("Error fetching reservation:", err);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setTotalPrice(basePrice * formData.quantity);
  }, [formData.quantity, basePrice]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, price: totalPrice }));
  }, [totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "phonenumber", "address", "email", "brand", "frameshape", "frametype", "framematerial", "framesize", "imageurlcolor", "quantity", "price", "gender"];

    for (let field of requiredFields) {
      if (!formData[field] || String(formData[field]).trim() === "") {
        alert(`Please fill all fields. Missing: ${field}`);
        return;
      }
    }

    if (!selectedImage) {
      alert("Please select a spectacle image.");
      return;
    }

    const updatedFormData = {
      ...formData,
      price: totalPrice,
      imageurlcolor: String(selectedImage),
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/api/auth/reservation/updateReservation/${id}`,
        updatedFormData
      );
      notifySuccess();
      console.log("Reservation updated:", res.data);
    } catch (err) {
      notifyError(err.message || "Unknown error");
      console.error("Error updating reservation:", err);
    }
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    setFormData((prev) => ({
      ...prev,
      imageurlcolor: imageUrl,
    }));
  };
  
  const ImageRadioButtons = () => {
    const images = [
      { id: 1, src: imageurl1, alt: "Spectacle 1" },
      { id: 2, src: imageurl2, alt: "Spectacle 2" },
      { id: 3, src: imageurl3, alt: "Spectacle 3" },
    ];

    return (
      <div className="image-radio-buttons">
        {images.map((image) => (
          image.src && (
            <div
              key={image.id}
              className={`image-option ${selectedImage === image.src ? "selected" : ""}`}
              onClick={() => handleImageSelect(image.src)}
            >
              <img src={image.src} alt={image.alt} className="image-choice" />
            </div>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="spectales-reservation-page">
      <NavBar />
      <div className="spectacles-section">
        <h1>Update Your Reservation</h1>
        <div className="reserve-main-section">
          <div className="Image-section">
            <img
              src={selectedImage || imageurl1}
              alt="Selected Spectacle"
              className="image-reserve"
            />
          </div>
          <div className="reserve-section">
            <form className="reserve-form" onSubmit={handleSubmit}>
              <h1>Personal Details</h1>
              <div className="name-mobnumber">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                <label>Mobile Number:</label>
                <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} />
              </div>

              <div className="name-mobnumber">
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                <label>Email:</label>
                <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
              </div>

              <h1>Spectacle Details</h1>
              <div className="spectacle-frame-type-meterial">
                <label>Frame Type:</label>
                <select name="frametype" value={formData.frametype} onChange={handleInputChange}>
                  <option value="">Select Frame Type</option>
                  <option value="half-rim">Half Rim</option>
                  <option value="full-rim">Full Rim</option>
                </select>

                <label>Frame Material:</label>
                <select name="framematerial" value={formData.framematerial} onChange={handleInputChange}>
                  <option value="">Select Frame Material</option>
                  <option value="Metal">Metal</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Acetate">Acetate</option>
                </select>
              </div>

              <div className="spectacle-size-options">
                <div className="size-change">
                  <h2>Select Spectacle Size</h2>
                  {["Small", "Medium", "Large"].map((size) => (
                    <label key={size}>
                      <input
                        type="radio"
                        name="framesize"
                        value={size}
                        checked={formData.framesize === size}
                        onChange={handleInputChange}
                      />
                      {size}
                    </label>
                  ))}
                </div>
                <div className="spectacles-quantity">
                  <h2>Quantity:</h2>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
              </div>

              <div className="image-section-2">
                <div className="spectacle-image-section-">
                  <h2>Select Spectacle Image</h2>
                  <ImageRadioButtons />
                </div>

                <div className="frame-shape-">
                  <label>Frame Shape:</label>
                  <select name="frameshape" value={formData.frameshape} onChange={handleInputChange}>
                    <option value="">Select Frame Shape</option>
                    <option value="round">Round</option>
                    <option value="cat eye">Cat Eye</option>
                  </select>

                  <label>Gender:</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="unisex">Unisex</option>
                    <option value="women">Women</option>
                  </select>
                </div>
              </div>

              
<div className="brand-total-section">
  <div className="brand-section-h1">
  <h3>Brand: {formData.brand}</h3>
  </div>
  <div className="reservation-button">
                <h1>Total Price: $ {totalPrice}</h1>
                <button type="submit" className="reserve-button">Update Reservation</button>
              </div>
  </div>
              
            </form>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default UpdateReservation;
