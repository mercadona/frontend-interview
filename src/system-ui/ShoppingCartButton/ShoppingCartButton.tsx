import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from 'store/cartData.context'

import cartIcon from '../assets/cart.svg'
import './ShoppingCartButton.css'

export const ShoppingCartButton = () => {
  const cartContext = useContext(CartContext)
  const itemCount = cartContext?.totalItems ?? 0

  return (
    <Link to="/cart" className="shopping-cart-button">
      <img src={cartIcon} alt="" />
      <span className="shopping-cart-button__amount">{itemCount}</span>
    </Link>
  )
}
