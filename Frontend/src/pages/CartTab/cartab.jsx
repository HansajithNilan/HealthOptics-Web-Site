import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem.jsx'
// Adjust the path

import './carttab.css'

function Cartab() {

  const carts = useSelector((store) => store.cart.items)
  const statusTab = useSelector((store) => store.cart.statusTab)

  console.log(carts)
  return (
    <div className={`carttab-container ${statusTab ? `true` : `false`}`}>
      <h2 className="carttab-header">Shopping Cart</h2>
      <div className="carttab-items">
      {carts && carts.length > 0 ? (
  carts.map((item, index) => (
    item.spectacleId ? (
      <CartItem key={item.spectacleId} data={item} />
    ) : (
      <div key={`invalid-${index}`} className="carttab-warning">
        Invalid product in cart
      </div>
    )
  ))
) : (
  <p>No items in cart.</p>
)}

      </div>
    
    </div>
  )
}

export default Cartab
