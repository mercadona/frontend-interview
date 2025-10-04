import { createContext } from 'react'
import { useCartData } from 'store/cartData.hook'

export const CartContext = createContext<CartContextValue>({
  cartData: {},
  updateCart: () => {},
})

type CartContextValue = {
  cartData: ReturnType<typeof useCartData>['cartData']
  updateCart: ReturnType<typeof useCartData>['updateCart']
}
