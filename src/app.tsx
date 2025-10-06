import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Cart } from 'pages/Cart/Cart'
import { Home } from 'pages/Home/Home'
import { CartDataProvider } from 'store/cartData.provider'

import { Layout } from './system-ui/layout'

export const App = () => {
  return (
    <BrowserRouter>
      <CartDataProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
      </CartDataProvider>
    </BrowserRouter>
  )
}
