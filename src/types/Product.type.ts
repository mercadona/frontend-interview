export type Product = {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
}

export type CartDataType = Record<string, number>
