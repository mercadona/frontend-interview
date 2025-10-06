import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { ProductCard } from './ProductCard'

const { id, price, name, image_url, description } = {
  id: 1,
  price: 20,
  name: 'name',
  image_url: 'https://placehold.co/192x192',
  description: 'asdas',
}

const setCartData = vi.fn()

describe('ProductCard unit test', () => {
  beforeEach(() => {
    render(
      <ProductCard
        key={id}
        price={price}
        id={id}
        name={name}
        image_url={image_url}
        description={description}
        setCartData={setCartData}
      />,
    )
  })
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  test('class must contain name text', () => {
    const node = screen.getByTestId(id)
    expect(node.querySelector('.product-card__title')?.textContent).toBe(name)
  })
  test('class must contain price text', () => {
    const node = screen.getByTestId(id)
    expect(node.querySelector('.product-card__price')?.textContent).include(
      String(price),
    )
  })
  test('class must contain description text', () => {
    const node = screen.getByTestId(id)
    expect(node.querySelector('.product-card__description')?.textContent).toBe(
      description,
    )
  })
  test('class must contain image_url', () => {
    const node = screen.getByTestId(id)
    expect(
      node.querySelector('.product-card__image')?.getAttribute('src'),
    ).include(image_url)
  })
  test('setCartData must be called on decrement button click', () => {
    const button = screen.getByTestId(`product-card__decrement`)
    button?.click()
    expect(setCartData).toHaveBeenCalledWith(String(id), -1)
  })
  test('setCartData must be called on increment button click', () => {
    const button = screen.getByTestId(`product-card__increment`)
    button?.click()
    expect(setCartData).toHaveBeenCalledWith(String(id), 1)
  })
})
