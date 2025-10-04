import { createContext } from 'react'
import { useCartData } from 'store/cartData.hook'

export const CartContext = createContext<CartContextValue>({
  cartData: {},
  updateCart: () => {},
  totalItems: 0,
})

type CartContextValue = {
  cartData: ReturnType<typeof useCartData>['cartData']
  updateCart: ReturnType<typeof useCartData>['updateCart']
  totalItems: number
}
