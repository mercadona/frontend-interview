import { createContext } from 'react'

import { CartDataType, UpdateCart } from './cartData.type'

const initialValue: CartContextValue = {
  cartData: {},
  updateCart: () => {},
  totalItems: 0,
}

export const CartContext = createContext<CartContextValue>(initialValue)

type CartContextValue = {
  cartData: CartDataType
  updateCart: UpdateCart
  totalItems: number
}
