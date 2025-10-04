import { useState } from 'react'

import type { CartDataType } from 'types/Product.type'

export function useCartData() {
  const [cartData, setCartData] = useState<CartDataType>({})

  function updateCart(id: string, increment: Increment) {
    setCartData((prevState) => reducer(prevState, id, increment))
  }
  return { updateCart, cartData }
}

export function reducer(prev: CartDataType, id: string, increment: Increment) {
  const nextData = { ...prev }
  nextData[id] = nextData[id] ? nextData[id] + increment : increment
  nextData[id] = nextData[id] < 0 ? 0 : nextData[id]
  return nextData
}

type Increment = 1 | -1
type UpdateCard = (id: string, increment: Increment) => void

export type UseCartDataReturnType = {
  updateCart: UpdateCard
  cartData: CartDataType
}
