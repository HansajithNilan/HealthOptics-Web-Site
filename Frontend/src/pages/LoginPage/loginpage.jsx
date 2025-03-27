import React, { useState } from "react";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

import NavBar from "../../components/NavBar/NavBar";
import Contact from "../HomePage/contact/contact";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



import "./loginpage.css";

function loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // const token = localStorage.getItem("accessToken")
  // const Token = JSON.parse(token)
 
  const navigate = useNavigate();
  
  const userlogin = async (e) => {

    e.preventDefault();


    const user = {
      email,
      password,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/user/login",
        user
      );
  
      const data = response.data;
  
      
  
      if (data.accessToken) {
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      }
  
      if (data.id) {
        localStorage.setItem("currentUser", JSON.stringify(data));
      }

      const token = localStorage.getItem('accessToken')
      const Token = JSON.parse(token)

      console.log(Token)

      try {
    
        const res = await axios.get('http://localhost:5000/api/auth/user/adminlogin', {
          headers: {
            Authorization: `Bearer ${Token}` // use Bearer if backend expects it
          }
        });
      
        console.log(res.data);
        toast.success("Admin login successful");

        navigate('/admin/dashboard')
      } catch (error) {
        console.error("Admin login failed:", error.response?.data || error.message);
      }


      

      toast.success("Login successful!");
      navigate('/spectacles')
  
    } catch (error) {
      console.log("Login failed");
      toast.error("Login failed. Please check your credentials.");
    }
  };
  

  return (
    <div>
      <NavBar />
      <div className="login-page">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={userlogin}>
            <div className="input-group">
              <FaRegEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                id="typePasswordX"
                className="form-control form-control-lg inputlogin"
                placeholder="Enter password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i
                className={`bi ${
                  passwordVisible ? "bi-eye" : "bi-eye-slash"
                } Showpassword`}
                id="togglePassword"
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></i>
            </div>
            <div className="options">
              <label>
                <input type="checkbox" className="remembertext" /> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <ToastContainer/>
          </form>
          <p className="register-link">
            Don’t have an account? <a href="#">Register</a>
          </p>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default loginpage;
