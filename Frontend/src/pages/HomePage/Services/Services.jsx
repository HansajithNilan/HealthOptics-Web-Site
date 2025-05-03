import React from 'react'
import NavBar from '../../../components/NavBar/NavBar.jsx'
import Footer from '../../../components/Footer/footer.jsx'
import services from '../../../assets/services1.png'

import './Services.css'

function Services() {
 
  return (
    
    <div className='about'>
       <NavBar />
        <img src={services} className='services'></img>
        <div className='about-right'>
            
            
            

        </div>
        <Footer />
    </div>
    
  )
}

export default Services
