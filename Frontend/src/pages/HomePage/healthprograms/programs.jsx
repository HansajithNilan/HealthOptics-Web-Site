import React from 'react'

import program_1 from '../../../assets/doctor-cheking-image1.jpg'
import program_2 from '../../../assets/doctor-cheking-image2.jpg'
import program_3 from '../../../assets/doctor-cheking-image3.jpg'
import logo from '../../../../public/website_logo.png'
import './programs.css'
function programs() {
  return (
    <div className='programs'>
      <div className='program'>
        <img src={program_1} alt=''/>
        <div className='caption'>
            <img src={logo} alt=''/>
            <p>Channel Doctors</p>
        </div>
      </div>
      <div className='program'>
        <img src={program_2} alt=''/>
        <div className='caption'>
            <img src={logo} alt=''/>
            <p>Channel Doctors</p>
        </div>
      </div>
      <div className='program'>
        <img src={program_3} alt=''/>
        <div className='caption'>
            <img src={logo} alt=''/>
            <p>check your eyes</p>
        </div>
      </div>
    </div>
  )
}

export default programs
