import { createContext } from 'react'

import { Product } from 'types/Product.type'

import { CartDataType, UpdateCart } from './cartData.type'

const initialValue: CartContextValue = {
  cartData: {},
  updateCart: () => {},
  totalItems: 0,
  productsData: [],
}

export const CartContext = createContext<CartContextValue>(initialValue)

type CartContextValue = {
  cartData: CartDataType
  updateCart: UpdateCart
  totalItems: number
  productsData: Product[]
}
