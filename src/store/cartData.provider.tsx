import { type ReactNode, useMemo } from 'react'
import { useCartData } from 'store/cartData.hook'

import { CartContext } from './cartData.context'

export function CartDataProvider({ children }: { children: ReactNode }) {
  const { updateCart, cartData } = useCartData()
  const totalItems = useMemo(
    () => Object.values(cartData).reduce((acc, curr) => acc + curr, 0),
    [cartData],
  )
  const cartContextValue = useMemo(
    () => ({ updateCart, cartData, totalItems }),
    [cartData, updateCart, totalItems],
  )
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  )
}
