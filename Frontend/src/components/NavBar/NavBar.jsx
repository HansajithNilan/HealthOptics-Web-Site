import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/website_logo.png';
import './NavBar.css';
import { AuthContext } from '../Context/AuthContext';

function NavBar() {
  const [sticky, setSticky] = useState(false);
  const { id, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt="Website Logo" className={`logo ${sticky ? 'logo-after' : ''}`} />

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/About">About Us</Link></li>
        <li><Link to="/Services">Services</Link></li>
        <li><Link to="/Feedback">Feedbacks</Link></li>

        {!id ? (
          <>
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
          </>
        ) : (
          <li>
            <button className="logout-btn" onClick={logout}>Sign out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
