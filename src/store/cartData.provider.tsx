import { type ReactNode, useMemo } from 'react'

import { useCartData } from 'store/cartData.hook'

import { CartContext } from './cartData.context'
import { useProductsData } from './products.hook'

export function CartDataProvider({ children }: { children: ReactNode }) {
  const { updateCart, cartData } = useCartData()
  const { productsData } = useProductsData()
  const totalItems = useMemo(
    () => Object.values(cartData).reduce((acc, curr) => acc + curr, 0),
    [cartData],
  )
  const cartContextValue = useMemo(
    () => ({ updateCart, cartData, totalItems, productsData }),
    [cartData, updateCart, totalItems, productsData],
  )
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  )
}
