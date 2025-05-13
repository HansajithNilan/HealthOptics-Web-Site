import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem.jsx'
import { toggleStatusTab } from '../../stores/cart'
import { FaTimes, FaShoppingCart } from 'react-icons/fa'

import './carttab.css'

function Cartab() {
  const dispatch = useDispatch()
  const carts = useSelector((store) => store.cart.items)
  const statusTab = useSelector((store) => store.cart.statusTab)

  const handleClose = () => dispatch(toggleStatusTab())
  
  const totalAmount = carts.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className={`carttab-container ${statusTab ? 'true' : 'false'}`}>
      <div className="carttab-header">
        <h2>Shopping Cart</h2>
        <button className="close-btn" onClick={handleClose}>
          <FaTimes />
        </button>
      </div>

      <div className="carttab-items">
        {carts && carts.length > 0 ? (
          <>
            <div className="cart-items-list">
              {carts.map((item, index) => (
                item.spectacleId ? (
                  <CartItem key={item.spectacleId} data={item} />
                ) : (
                  <div key={`invalid-${index}`} className="carttab-warning">
                    Invalid product in cart
                  </div>
                )
              ))}
            </div>

            <div className="cart-summary">
              <div className="total-section">
                <span>Total:</span>
                <span className="total-amount">Rs. {totalAmount.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <FaShoppingCart className="empty-cart-icon" />
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cartab
