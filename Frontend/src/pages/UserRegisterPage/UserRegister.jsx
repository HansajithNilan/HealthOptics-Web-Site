import React, { useState } from 'react';
import Login_Doctor from '../../assets/Login_doctor.jpg';
import './UserRegister.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/footer';
import Contact from '../HomePage/contact/contact';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function UserRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const notifySuccess = () => toast.success(`${name}'s account created successfully!`);
  const notifyError = (message) => toast.error(message || 'Error creating account!');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, email, password, role });

    axios.post('http://localhost:5000/api/auth/user/register', { name, email, password, role })
      .then((result) => {
        console.log('User registration successful:', result.data);
        notifySuccess();
      })
      .catch((err) => {
        const errorMessage = err.response ? err.response.data.message : 'Registration failed. Please try again.';
        setError(errorMessage);
        notifyError(errorMessage);
        console.error('Error registering user:', err);
      });
  };

  return (
    <div className='loginPage container'>
      <NavBar />
      <div className='login-page-wrapper'>
        <div className='Login-section'>
          <div className='Image-login'>
            <img src={Login_Doctor} alt='Login illustration' />
          </div>
          <div className='form-section'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className='name-section'>
                <label>Name: </label>
                <input
                  className='name-input'
                  type='text'
                  placeholder='Enter your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='name-section'>
                <label>Email: </label>
                <input
                  className='name-input'
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='name-section'>
                <label>Password: </label>
                <input
                  className='name-input'
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='name-section'>
                <label>Role: </label>
                <input
                  className='name-input'
                  type='text'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder='Enter your role'
                  required
                />
              </div>

              <button type='submit'>Register</button>
            </form>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default UserRegister;
