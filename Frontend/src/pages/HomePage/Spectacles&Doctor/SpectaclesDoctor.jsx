import React from 'react'
import SpectaclesDoctorImage from '../../../assets/spectaclDoctorImage.jpg'
import doctorappomentImage from '../../../assets/doctorappomentImage.jpg'

import './SpectaclesDoctor.css'
function SpectaclesDoctor() {
  return (
    <div className='section-images-home'>
      <div className='SpectaclesDoctorImage'>
      <img src={SpectaclesDoctorImage} width={450} height={350}/>
      <h1>Select Spectacles</h1>
      <h5>select your best spectacles with our system</h5>
      <a href="/spectacles" class="custom-button">Click Me</a>
      </div>
      <div className='doctorappoimentImage'>
      <img src={doctorappomentImage} width={450} height={350}/>
      <h1>Doctor Apoiments</h1>
      <h5>select your best spectacles with our system</h5>
      <a href="/ophthalmologists" class="custom-button">Click Me</a>

      </div>
        
       
      
    </div>
  )
}

export default SpectaclesDoctor
