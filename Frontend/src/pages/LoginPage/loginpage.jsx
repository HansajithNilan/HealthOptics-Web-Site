import React, { useContext, useState } from "react";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import Contact from "../HomePage/contact/contact";
import Footer from "../../components/Footer/footer";
import { AuthContext } from "../../components/Context/AuthContext";

import "./loginpage.css";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const userlogin = async (e) => {
    e.preventDefault();
  
    const user = { email, password };
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/user/login",
        user
      );
  
      const data = response.data;
      console.log(data);
  
      if (data.accessToken) {
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      }
  
      if (data.id) {
        localStorage.setItem("currentUser", JSON.stringify(data));
      }
  
      const token = data.accessToken;
  
      if (data.role === "admin") {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/auth/user/adminlogin",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          console.log("Admin validated:", res.data);
          toast.success("Admin login successful!");
          login(); 
          navigate("/admin/dashboard");
        } catch (error) {
          console.error("Admin validation failed:", error.response?.data || error.message);
          toast.error("Admin login validation failed.");
        }
        return;
      }
  
      if (data.role === "user") {
        toast.success("Login successful!");
        login();
        navigate("/spectacles");
        return;
      }
  
      
      toast.error("Unrecognized user role.");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
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
                placeholder="Enter password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`bi ${
                  passwordVisible ? "bi-eye" : "bi-eye-slash"
                } Showpassword`}
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></i>
            </div>
            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <ToastContainer />
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

export default LoginPage;
