import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCartData } from 'store/useCartData'

import { Cart } from 'pages/Cart/Cart'
import { Home } from 'pages/Home/Home'

import { Layout } from './system-ui/layout'

export const App = () => {
  const { updateCart, cartData } = useCartData()
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home setCartData={updateCart} />} />
          <Route path="/cart" element={<Cart cartData={cartData} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
