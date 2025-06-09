import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from 'pages/Home/Home'

import { Layout } from './system-ui/layout'

export const App = () => (
  <Layout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </Layout>
)
