import { useEffect, useState } from 'react'
import { Product } from 'types/Product.type'

import { fetchProducts } from './Home.service'

export function useHomeData(): {
  products: Product[]
} {
  const [data, setData] = useState<Product[]>([])
  useEffect(() => {
    fetchProducts().then((_data) => setData(_data))
  }, [])
  return {
    products: data,
  }
}
