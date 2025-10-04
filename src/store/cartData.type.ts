export type Increment = 1 | -1
export type UpdateCart = (id: string, increment: Increment) => void

export type UseCartDataReturnType = {
  updateCart: UpdateCart
  cartData: CartDataType
}

export type CartDataType = Record<string, number>
