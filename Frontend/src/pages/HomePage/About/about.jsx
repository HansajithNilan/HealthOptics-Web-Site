import React from 'react'

import about_img from '../../../assets/about_image.jpg'
import NavBar from '../../../components/NavBar/NavBar'
import Footer from '../../../components/Footer/footer'

import './about.css'

function about() {
 
  return (
    
    <div className='about'>
       <NavBar />
        <div className='about-left'>
            <img src={about_img} className='about-image'></img>
        </div>
        <div className='about-right'>
            
            <p>HealthOptics is your go-to online store for high-quality spectacles, offering stylish and affordable eyewear for everyone. Whether you're looking for trendy frames, prescription glasses, or blue-light filtering lenses, we have a wide selection to suit your needs. Our easy-to-use selection tools help you find the perfect pair based on style, face shape, and vision requirements. With premium materials, expert craftsmanship, and budget-friendly prices, we ensure that you get clear vision without compromising on comfort or fashion. Shop with confidence and experience seamless online ordering, fast delivery, and excellent customer service at HealthOptics!</p>
            

        </div>
      
    </div>
    
  )
}

export default about
