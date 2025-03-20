import React from 'react'
import Login_Doctor  from '../../assets/Login_doctor.jpg'

import './LoginPage.css'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/footer'
import  Contact from '../../pages/HomePage/contact/contact'

function LoginPage() {
  return (
   <div className='loginPage  container'>
     <NavBar/>
    <div className='login-page-wrapper'>
      
       
      <div className='Login-section '>
       
        
        <div className='Image-login'>
        <img src={Login_Doctor} alt='image not '/>
        </div>
        <div className='form-section'>
          <h1>Signin</h1>
          <form>
            <div className='name-section'>
            <label>Name: </label>
            <input className='name-input'
            type='name'
            placeholder='Enter your name'
            required
            />
            </div>
            <div className='name-section'>
            <label>Email: </label>
            <input className='name-input'
            type='name'
            placeholder='Enter your name'
            required
            />
            </div>
            <div className='name-section'>
            <label>password: </label>
            <input className='name-input'
            type='name'
            placeholder='Enter your name'
            required
            />
            </div>
            <div className='name-section'>
            <label>role: </label>
            <input className='name-input'
            type='name'
            placeholder='Enter your name'
            required
            />
            </div>
           
         <button type='submit'>Register</button>
          </form>

        </div>
      
      </div>
     
    </div>
    <Contact/>
    <Footer />
    </div>
    
  )
}

export default LoginPage
