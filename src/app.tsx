import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Cart } from 'pages/Cart/Cart'
import { Home } from 'pages/Home/Home'
import type { CartDataType } from 'types/Product.type'

import { Layout } from './system-ui/layout'

export const App = () => {
  const [cartData, setCartData] = useState<CartDataType>({})

  function updateCart(id: string, increment: 1 | -1) {
    setCartData((prev) => {
      const nextData = { ...prev }
      nextData[id] = nextData[id] ? nextData[id] + increment : increment
      nextData[id] = nextData[id] < 0 ? 0 : nextData[id]
      return nextData
    })
  }
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
