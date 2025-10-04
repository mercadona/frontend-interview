import { useContext } from 'react'
import { CartContext } from 'store/cartData.context'

export function Cart() {
  const { cartData } = useContext(CartContext)

  return JSON.stringify(cartData, null, 2)
}
