import { CartDataType } from 'types/Product.type'

export function Cart(props: { cartData: CartDataType }) {
  return JSON.stringify(props.cartData, null, 2)
}
