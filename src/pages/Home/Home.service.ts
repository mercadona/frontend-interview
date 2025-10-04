import { Product } from 'types/Product.type'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL + '/api/products')

  if (!response.ok) {
    throw new Error('Failt fetch data, status:' + response.status)
  }
  return await response.json()
}
