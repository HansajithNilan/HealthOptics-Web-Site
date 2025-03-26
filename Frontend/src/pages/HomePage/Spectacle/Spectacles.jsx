import React, { useState, useEffect } from "react";
import NavBar from '../../../components/NavBar/NavBar.jsx';
import './Spectacles.css';
import axios from "axios";

const Spectacles = () => {
    // const spectacles = [
    //     {
    //       id: 1,
    //       model: "Classic 444",
    //       type: "Eyeglasses",
    //       brand: "RayBan",
    //       gender: "Unisex",
    //       frameShape: "Round",
    //       frameMaterial: "Metal",
    //       frameType: "Full Rim",
    //       hingeType: "Spring Hinge",
    //       description: "Stylish and comfortable eyeglasses",
    //       frameSize: ["Small", "Medium", "Large"],
    //       price: 12000,
    //       rating: 4,
    //       stock: 10,
            
    //     },]


    const [spectacles, setSpectacles] = useState([]);

    useEffect(() => {
        // Replace with the actual URL of your API endpoint
        axios.get('http://localhost:5000/api/spectacle/')
            .then(response => {
                setSpectacles(response.data); // Update the state with the fetched data
            })
            .catch(error => {
                console.error("There was an error fetching the spectacles data:", error);
            });
    }, []);


 // Function to render stars based on rating
 const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let stars = [];
    
    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={`full-${i}`} className="star">&#9733;</span>);
    }
    if (halfStar) {
        stars.push(<span key="half" className="star">&#189;</span>);
    }
    while (stars.length < 5) {
        stars.push(<span key={`empty-${stars.length}`} className="star empty">&#9733;</span>);
    }
    return stars;
};



    return (
        <div>
             <NavBar/>
             <div className="spectacle-grid-container">
                <h1>Spectacles</h1>
                <div className="spectacle-grid">
                {spectacles.map((spectacle) => (
                        <div key={spectacle.id} className="spectacle-card">
                            <img
                                src={spectacle.imageurlcolor1[0]} 
                                alt={spectacle.model}
                                className="spectacle-image"
                            />
                            <div className="spectacle-details">
                                <h2 className="spectacle-model">{spectacle.model}</h2>
                                <p className="spectacle-brand">{spectacle.brand} - {spectacle.type}</p>
                                <p className="spectacle-gender">{spectacle.gender}</p>
                                <p className="spectacle-price">LKR {spectacle.price}</p>
                                <div className="spectacle-rating">
                                    {renderStars(spectacle.rating)}
                                </div>
                                <button className="shop-now-btn">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
             </div>

        </div>
    );
}

export default Spectacles;
