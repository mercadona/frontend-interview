import { useEffect, useState } from 'react'

import type { CartDataType, Increment } from './cartData.type'

const STORAGE_KEY = 'cartData'
const persistedCartData = localStorage.getItem(STORAGE_KEY)
const initialCartData = persistedCartData
  ? (JSON.parse(persistedCartData) as CartDataType)
  : {}

export function useCartData() {
  const [cartData, setCartData] = useState<CartDataType>(initialCartData)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData))
  }, [cartData])

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
