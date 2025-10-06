import { useCallback, useEffect, useReducer } from 'react'

import type { Action, CartDataType, Increment } from './cartData.type'

const STORAGE_KEY = 'cartData'
const persistedCartData = localStorage.getItem(STORAGE_KEY)
const initialCartData = persistedCartData
  ? (JSON.parse(persistedCartData) as CartDataType)
  : {}

export function useCartData() {
  const [cartData, dispatch] = useReducer(reducer, initialCartData)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData))
  }, [cartData])

  const updateCart = useCallback(
    (id: string, increment: Increment) => {
      dispatch({ type: 'UPDATE_CART', payload: { id, increment } })
    },
    [dispatch],
  )

  return { updateCart, cartData }
}

export function reducer(prev: CartDataType, action: Action): CartDataType {
  // eslint-disable-next-line
  const nextData = structuredClone(prev)
  switch (action.type) {
    case 'UPDATE_CART':
      nextData[action.payload.id] = nextData[action.payload.id]
        ? nextData[action.payload.id] + action.payload.increment
        : action.payload.increment
      nextData[action.payload.id] =
        nextData[action.payload.id] < 0 ? 0 : nextData[action.payload.id]
      return nextData
    default:
      return prev
  }
}
