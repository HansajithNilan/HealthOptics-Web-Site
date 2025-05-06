import React, { useEffect, useState } from 'react';
import NavBar from '../../../components/NavBar/NavBar.jsx';
import Imagetext from '../Introduction/imagetext.jsx';
import Introduction from '../systemintro/introduction.jsx';
import Programs from '../healthprograms/programs.jsx';
import Aboutsection from '../About/about.jsx';
import Footer from '../../../components/Footer/footer.jsx';
import Contact from '../contact/contact.jsx';
import SpectaclesDoctor from '../Spectacles&Doctor/SpectaclesDoctor.jsx';
import Cartab from '../../CartTab/cartab.jsx';
import Services from '../Services/Services.jsx';
import './Homepage.css';

function Homepage() {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showPopup && (
        <div className='popup'>
        <div className="popup-overlay">
          <div className="popup-content">
            <img
              src="./website_logo.png"
              alt="Logo"
              className="popup-logo"
            />
            <h2>Welcome to HealthOptics !</h2>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
        </div>
      )}

      {!showPopup && (
        <>
          <NavBar />
          <Cartab />
          <Imagetext />
          <div className="container">
            <Introduction title="HealthOptics" subtitle="Choose Your Matching Spectacles" />
            <Programs />
            <Introduction title="About us" subtitle="Learn more about what we do" />
            <SpectaclesDoctor />
            <Aboutsection /> 
            <Contact /> 
          </div>
          
        </>
      )}
      <Footer />
    </div>
  );
}

export default Homepage;
