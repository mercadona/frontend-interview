import { type ReactNode, useMemo } from 'react'
import { useCartData } from 'store/cartData.hook'

import { CartContext } from './cartData.context'

export function CartDataProvider({ children }: { children: ReactNode }) {
  const { updateCart, cartData } = useCartData()

  const cartContextValue = useMemo(
    () => ({ updateCart, cartData }),
    [cartData, updateCart],
  )
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  )
}
