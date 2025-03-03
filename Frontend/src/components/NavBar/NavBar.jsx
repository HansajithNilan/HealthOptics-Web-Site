import React from 'react'

import logo from  "../../../public/website_logo.png"
import './NavBar.css'
function NavBar() {
  return (
    <nav className='container' >
        
        <img src={logo}  alt='' className='logo'></img>
        <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Feedbacks</li>
            <button className='signin-btn'>SignIn</button>
            <button className='sigup-btn'>SignUp</button>
        </ul>
        
       
        
       
        
    </nav>
  )
}

export default NavBar
