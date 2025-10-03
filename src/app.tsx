
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from 'pages/Home/Home'

import { Layout } from './system-ui/layout'

export const App = () => {
  // const [shoppingCartstate, setShoppingCartstate] = React.useState()
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={'cart'} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
