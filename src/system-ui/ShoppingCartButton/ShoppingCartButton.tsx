import cartIcon from '../assets/cart.svg'
import './ShoppingCartButton.css'

export const ShoppingCartButton = () => {
  return (
    <button className="shopping-cart-button">
      <img src={cartIcon} alt="" />
      <span className="shopping-cart-button__amount">0</span>
    </button>
  )
}
