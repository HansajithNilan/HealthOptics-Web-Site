import React from 'react';
import './imagetext.css';

function ImageText() {
  return (
    <div className="intro">
      {/* Video Background */}
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://videos.pexels.com/video-files/5995138/5995138-hd_1920_1080_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="video-overlay"></div>

      {/* Text Content */}
      <div className="introtext">
        <h1>Book Eye Appointments & Find Your Perfect Glasses with HealthOptics!</h1>
        <p>
          Book your eye care appointments with top doctors and reserve the perfect pair of spectacles
          effortlessly—all in one place!
        </p>
      </div>
    </div>
  );
}

export default ImageText;
