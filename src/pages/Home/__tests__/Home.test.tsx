import { cleanup, render, screen } from '@testing-library/react'
import { CartDataProvider } from 'store/cartData.provider'
import { describe, expect, test, vi } from 'vitest'

import { Home } from '../Home'
import { DATA } from './Home.fixtures'

vi.mock('../../../store/products.service.ts', async () => {
  return {
    fetchProducts: () => {
      return Promise.resolve(DATA)
    },
  }
})

describe('Home ProductList', () => {
  beforeEach(() => {
    render(
      <CartDataProvider>
        <Home />
      </CartDataProvider>,
    )
  })
  afterEach(() => {
    cleanup()
  })
  test('must be rendered', () => {
    expect(screen.getByTestId('Home-ProductList')).toBeInTheDocument()
  })

  test('fetch data and be shown', async () => {
    expect(await screen.findByText(DATA[0].name)).toBeInTheDocument()
  })
})
