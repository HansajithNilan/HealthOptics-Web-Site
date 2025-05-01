import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/website_logo.png';
import './NavBar.css';
import { AuthContext } from '../Context/AuthContext.jsx';


import cartImage from '../../assets/cartImage.png'
import { useSelector,useDispatch } from 'react-redux';
import { toggleStatusTab } from '../../stores/cart';

function NavBar() {
  const [sticky, setSticky] = useState(false);
  const { id, logout,name } = useContext(AuthContext);
const [totalquantity, setTotalQuantity] = useState(0);
const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(()=>{
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(totalQuantity);
  })
  const handleOpenTabCart = ()=>{
    dispatch(toggleStatusTab());
  }
  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt="Website Logo" className={`logo ${sticky ? 'logo-after' : ''}`} />

      <ul>
        <li><Link to="/">Home </Link></li>
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
          <div className="cart-container"  onClick={handleOpenTabCart}>
           
            <img src={cartImage} width={20} height={20} />
            <span className='cart-numbers'>{totalquantity}</span>
            </div>
          </li>
          
        )}
      </ul>
      
    </nav>
  );
}

export default NavBar;
