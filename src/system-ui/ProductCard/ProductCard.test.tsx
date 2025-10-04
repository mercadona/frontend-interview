import { cleanup, getByTestId, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { ProductCard } from './ProductCard'

const { id, price, name, image_url, description } = {
  id: 1,
  price: 20,
  name: 'name',
  image_url: 'https://placehold.co/192x192',
  description: 'asdas',
}

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
      />,
    )
  })
  afterEach(() => {
    cleanup()
  })
  test('class must container name text', () => {
    const node = screen.getByTestId(id)
    expect(node.querySelector('.product-card__title')?.textContent).toBe(name)
  })
  test('class must container price text', () => {
    const node = screen.getByTestId(id)
    expect(node.querySelector('.product-card__price')?.textContent).include(
      String(price),
    )
  })
})
