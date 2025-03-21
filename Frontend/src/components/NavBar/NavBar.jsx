import React, { useEffect, useState } from 'react'

import logo from  "../../../public/website_logo.png"
import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar() {
  const [sticky,setSticky] = useState(false)

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY > 50 ? setSticky(true):setSticky(false);
    })
  },[]);


  return (
    <nav className={`container ${sticky? 'dark-nav':''}` } >
        
        <img src={logo}  alt='' className={`logo ${sticky? 'logo-after':''}`}></img>
        <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Feedbacks</li>
            <Link to="/login">
            <button className='signin-btn'>SignIn</button>
            </Link>
            <button className='sigup-btn'>SignUp</button>
        </ul>
        
       
        
       
        
    </nav>
  )
}

export default NavBar
