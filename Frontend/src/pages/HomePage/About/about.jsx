import React from 'react'
import about_img from '../../../assets/about_image.jpg'
import NavBar from '../../../components/NavBar/NavBar'
import Footer from '../../../components/Footer/footer'
import { FaEye, FaHandHoldingHeart, FaUserMd, FaGlasses } from 'react-icons/fa'
import './about.css'

function about() {
  const features = [
    {
      icon: <FaEye />,
      title: "Expert Eye Care",
      description: "Professional eye care services with state-of-the-art equipment"
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Patient-Focused",
      description: "Dedicated to providing personalized care for every patient"
    },
    {
      icon: <FaUserMd />,
      title: "Qualified Doctors",
      description: "Team of experienced ophthalmologists and optometrists"
    },
    {
      icon: <FaGlasses />,
      title: "Quality Eyewear",
      description: "Wide selection of high-quality frames and lenses"
    }
  ]

  return (
    <div className='about-page'>
      <NavBar />
      
      <div className='about-hero'>
        <h1>About HealthOptics</h1>
        <p>Your Trusted Partner in Eye Care</p>
      </div>

      <div className='about'>
        <div className='about-left'>
          <img src={about_img} className='about-image' alt="About HealthOptics"></img>
        </div>
        <div className='about-right'>
          <h2>Our Story</h2>
          <p>HealthOptics is your go-to online store for high-quality spectacles, offering stylish and affordable eyewear for everyone. Whether you're looking for trendy frames, prescription glasses, or blue-light filtering lenses, we have a wide selection to suit your needs.</p>
          <p>Our easy-to-use selection tools help you find the perfect pair based on style, face shape, and vision requirements. With premium materials, expert craftsmanship, and budget-friendly prices, we ensure that you get clear vision without compromising on comfort or fashion.</p>
        </div>
      </div>

      <div className='features-section'>
        <h2>Why Choose Us</h2>
        <div className='features-grid'>
          {features.map((feature, index) => (
            <div key={index} className='feature-card'>
              <div className='feature-icon'>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      
      </div>
      
      <Footer />

    </div>
  )
}

export default about
