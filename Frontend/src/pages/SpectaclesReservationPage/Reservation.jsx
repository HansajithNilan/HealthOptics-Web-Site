import React, { useState, useEffect, useRef, useContext } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "./Reservation.css";
import Footer from "../../components/Footer/footer.jsx";
import Contact from "../HomePage/contact/contact.jsx";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../components/Context/AuthContext.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/cart.jsx";
import cartImage from '../../assets/cartImage.png';
import Cartab from "../CartTab/cartab.jsx";
import * as faceapi from 'face-api.js';


function Reservation() {
  const { name, email } = useContext(AuthContext);
  const { id, number } = useParams();
  const navigate = useNavigate();
  const fetchDataRef = useRef(false);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

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
    price: 0,
    number: 0,
  });

  const notifySuccess = () => toast.success(`${formData.name}'s reservation created successfully!`);
  const notifyError = (message) => toast.error(message || 'Error creating reservation!');

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageurl1, setImageurl1] = useState(null);
  const [imageurl2, setImageurl2] = useState(null);
  const [imageurl3, setImageurl3] = useState(null);
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Camera state
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (e) => {
    setFormData({ ...formData, quantity: Number(e.target.value) });
  };
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');
    };
    loadModels();
  }, []);
  

  useEffect(() => {
    if (fetchDataRef.current) return;
    fetchDataRef.current = true;

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/spectacle/${id}`);
        setImageurl1(res.data.imageurlcolor1);
        setImageurl2(res.data.imageurlcolor2);
        setImageurl3(res.data.imageurlcolor3);
        setBasePrice(Number(res.data.price) || 0);
        setFormData((prev) => ({ ...prev, brand: res.data.brand }));
      } catch (err) {
        console.error("Error fetching spectacle data", err);
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

    const requiredFields = [
      "phonenumber", "address", "brand", "frameshape",
      "frametype", "framematerial", "framesize", "imageurlcolor", "quantity", "price", "gender"
    ];

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
      name: name,
      email: email,
      price: totalPrice,
      imageurlcolor: String(selectedImage),
      number: number
    };

    try {
      await axios.post(
        `http://localhost:5000/api/auth/reservation/createReservation/${number}`,
        updatedFormData
      );
      notifySuccess();
      navigate(`/reservationdisplay/${number}`);
    } catch (err) {
      notifyError(err.message);
      console.error("Error Creating Reservation", err.response?.data || err.message);
    }
  };
  

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    setFormData((prev) => ({
      ...prev,
      imageurlcolor: imageUrl,
    }));
  };
  const handleTryOnface = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
  
        const video = videoRef.current;
  
        video.addEventListener("play", () => {
          const canvas = faceapi.createCanvasFromMedia(video);
          canvasRef.current = canvas;
          document.querySelector(".Image-section").append(canvas);
  
          const displaySize = { width: video.width, height: video.height };
          faceapi.matchDimensions(canvas, displaySize);
  
          setInterval(async () => {
            const detections = await faceapi
              .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks(true);
  
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  
            if (resizedDetections.length > 0 && selectedImage) {
              const ctx = canvas.getContext("2d");
              const landmarks = resizedDetections[0].landmarks;
              const leftEye = landmarks.getLeftEye();
              const rightEye = landmarks.getRightEye();
  
              const eyeDistance = rightEye[0].x - leftEye[3].x;
              const x = leftEye[0].x - eyeDistance * 0.2;
              const y = leftEye[0].y - eyeDistance * 0.6;
              const width = eyeDistance * 1.6;
              const height = eyeDistance * 0.9;
  
              const img = new Image();
              img.src = selectedImage;
              img.onload = () => {
                ctx.drawImage(img, x, y, width, height);
              };
            }
          }, 100);
        });
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast.error("Failed to access camera");
    }
  };

  const handleAddToCart = () => {
    const spectacleId = id;
    const quantity = formData.quantity;
    dispatch(addToCart({ spectacleId, quantity }));
    toast.success("Added to cart successfully!");
  };

  const handleTryOn = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast.error("Failed to access camera");
    }
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
          <div
            key={image.id}
            className={`image-option ${selectedImage === image.src ? "selected" : ""}`}
            onClick={() => handleImageSelect(image.src)}
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
        <Cartab />
        <h1>Reserve your Spectacles</h1>
        <div className="reserve-main-section">
         <div className="Image-section">
  {showCamera ? (
    <>
      <video ref={videoRef} className="image-reserve" width="100%" height="100%" autoPlay muted />
      {/* Canvas will be appended here dynamically */}
    </>
  ) : (
    <img
      src={selectedImage || imageurl1}
      alt="Selected Spectacle"
      className="image-reserve"
    />
  )}
</div>

          <div className="reserve-section">
            <form className="reserve-form" onSubmit={handleSubmit}>
              <h1>Personal Details</h1>
              <div className="name-mobnumber">
                <label>Name:</label>
                <input type="text" name="name" value={name} disabled />
                <label>Mobile Number:</label>
                <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} />
              </div>
              <div className="name-mobnumber">
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                <label>Email:</label>
                <input type="text" name="email" value={email} disabled />
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

              <h3>Brand: {formData.brand}</h3>
              <h1>Total Price: {totalPrice}</h1>

              <div className="reservation-button">
                <button type="submit" className="reserve-button">Reserve Now</button>
                <button type="button" className="reserve-button" onClick={handleTryOn}>Try On</button>
                <button type="button" className="add-to-cart-" onClick={handleAddToCart}>
                  <img src={cartImage} width={18} height={18} alt="cart" /> Add To Cart
                </button>
              </div>

              <ToastContainer position="top-right" autoClose={3000} />
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
