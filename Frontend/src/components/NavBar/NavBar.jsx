import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/website_logo.png';
import './NavBar.css';
import { AuthContext } from '../Context/AuthContext.jsx';

import cartImage from '../../assets/cartImage.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatusTab } from '../../stores/cart';
import { toast, ToastContainer } from "react-toastify";

function NavBar() {
  const [sticky, setSticky] = useState(false);
  const { id, logout, name, role } = useContext(AuthContext);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(total);
  }, [cartItems]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleadminlogin = () => {
    if (role === 'admin') {
      window.location.href = "/admin/dashboard";
    } else {
      toast.error("You are not authorized to access this page.");
    }
  };

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <Link to="/">
        <img src={logo} alt="HealthOptics" className={`logo ${sticky ? 'logo-after' : ''}`} />
      </Link>
      <ToastContainer />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/About">About Us</Link></li>
        <li><Link to="/Services">Services</Link></li>
        <li><Link to="/Feedback">Feedbacks</Link></li>

        {!id ? (
          <div className="auth-buttons">
            <li>
              <Link to="/loginpage">
                <button className="signin-btn">Sign In</button>
              </Link>
            </li>
            <li>
              <Link to="/Register">
                <button className="signup-btn">Sign Up</button>
              </Link>
            </li>
          </div>
        ) : (
          <li className="dropdown-wrapper">
            <button className="logout-btn" onClick={toggleDropdown}>
              Sign out
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleadminlogin}>Admin Dashboard</button>
                <button onClick={handleLogout}>Confirm Logout</button>
              </div>
            )}

            <div className="cart-container" onClick={handleOpenTabCart}>
              <img src={cartImage} width={24} height={24} alt="Shopping Cart" />
              {totalQuantity > 0 && (
                <span className="cart-numbers">{totalQuantity}</span>
              )}
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
