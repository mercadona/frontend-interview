import { BrowserRouter } from 'react-router-dom'

import { Routes } from 'pages/routes'
import { Layout } from 'system-ui/layout'

export const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes />
    </Layout>
  </BrowserRouter>
)
