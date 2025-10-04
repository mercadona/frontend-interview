import { cleanup, render, screen} from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { Home } from '../Home'

const DATA = [
  {
    id: 1,
    name: 'Red Apple',
    description: 'Fresh and crispy red apple from organic farms.',
    price: 0.5,
    image_url: '/api/images/red_apple.png',
    category: 'Fruits',
  },
  {
    id: 2,
    name: 'Banana',
    description: 'Ripe bananas rich in potassium.',
    price: 0.3,
    image_url: '/api/images/banana.png',
    category: 'Fruits',
  },
]

vi.mock('./Home.service.ts', async () => {
  return {
    fetchProducts: () => Promise.resolve(DATA),
  }
})

describe('ProductCard unit test', () => {
  beforeEach(() => {
    render(<Home />)
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
