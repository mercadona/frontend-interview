import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import { expect } from 'vitest'
import { configure, matchers } from 'wrapito'

const { VITE_APP_API_HOST: defaultHost } = import.meta.env

configure({
  defaultHost,
  mount: render,
  portal: 'modal-root',
})

expect.extend(matchers)
