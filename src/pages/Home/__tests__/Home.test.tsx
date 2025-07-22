import { render, screen } from '@testing-library/react'
import { App } from 'app'
import { expect } from 'vitest'

it('should render the page elements', () => {
  render(<App />)

  expect(
    screen.getByRole('img', { name: 'Logo de Mercadona' }),
  ).toBeInTheDocument()
})
