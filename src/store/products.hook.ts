import { useEffect, useState } from 'react'

import { Product } from 'types/Product.type'

import { fetchProducts } from './products.service'

export function useProductsData() {
  const [productsData, setProductsData] = useState<Product[]>([])
  useEffect(() => {
    fetchProducts()
      .then((_data) => setProductsData(_data))
      .catch(console.error) // TODO handle error AND show to user
  }, [])
  return { productsData }
}
