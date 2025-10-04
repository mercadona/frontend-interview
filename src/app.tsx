import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from 'pages/Home/Home'

import { Layout } from './system-ui/layout'

type CartDataType = Record<string, number>

export const App = () => {
  const [cartData, setCartData] = useState<CartDataType>()
  console.log({ cartData })

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

function Cart(props: any) {
  return JSON.stringify(props, null, 2)
}
