import React from 'react';
import './Footer.css';
import logo from '../../../public/website_logo.png';
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";

function Footer() {
  return (
    <footer className="vivo-footer">
      
      <div className="vivo-container">
        
        {/* Left Section: Logo and Tagline */}
        <div className="vivo-left">
          <div className="vivo-logo">
          <img src={logo} alt="Website Logo" className={`logofooter`} />
            <h2>HealthOptics</h2>
            
          </div>
          
          <p className="vivo-tagline">
            Dynamically procrastinate B2C users after installed base benefits directed convergence without revolutionary medicine.
          </p>
          <div className="vivo-contact-info">
            <p><span className="icon">✉️</span> info@HealthOptics.com</p>
            <p><span className="icon">📍</span> 68 Erie St, Jersey City, NJ 07302</p>
            <p><span className="icon">📞</span> +(94)41 224-8651</p>
          </div>
        </div>

        {/* Middle Section: About Vivo, Our Services, Latest News */}
        <div className="vivo-middle">
          {/* About Vivo Section */}
          <div className="vivo-section">
          
            <h2>About HealthOptics</h2>
            <ul>
              <li>General Information</li>
              <li>Team</li>
              <li>Doctors Profile</li>
              <li>Working Hours</li>
              <li>Appointments</li>
              <li>Contact & Location</li>
            </ul>
          </div>

          {/* Our Services Section */}
          <div className="vivo-section">
            <h2>Our Services</h2>
            <ul>
              <li>Your Family Doctor</li>
              <li>Pediatrics</li>
              <li>Clinics</li>
              <li>Dentistry</li>
              <li>Optometrist</li>
              <li>Surgery</li>
            </ul>
          </div>

          {/* Latest News Section */}
          <div className="vivo-section">
            <h2>Latest News</h2>
            <ul>
              <li>Best Thing Simple Hand Wash Can Do For a Child <span className="news-date">16 July 2022</span></li>
              <li>Concussion in Children May Have Multiple Causes <span className="news-date">21 June 2022</span></li>
              
            </ul>
          </div>
        </div>

        {/* Right Section: Emergency Line and Social Media */}
        <div className="vivo-right">
          <div className="emergency-line">
            <h3>24/7 Emergency Line</h3>
            <p className="emergency-number">+(94)41 224-8651</p>
            <p>Call us now if you are in a medical emergency need, we will reply swiftly and provide you with medical aid.</p>
          </div>
          <div className="social-media">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={twitter} alt="Twitter" />
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebook} alt="Facebook" />
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} alt="Instagram" />
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} alt="LinkedIn" />
                      </a>
          </div>
          <div className="footer-links">
            <a href="#">Cookie Policy</a> | <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;