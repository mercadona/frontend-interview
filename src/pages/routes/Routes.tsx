import { Route, Routes as RouterRoutes } from 'react-router-dom'

import { Home } from '../home'
import { Login } from '../login'
import { NotFound } from '../not-found'
import { PATHS } from '../paths'

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LOGIN} element={<Login />} />
      <Route path={PATHS.NOT_FOUND} element={<NotFound />} />
    </RouterRoutes>
  )
}
