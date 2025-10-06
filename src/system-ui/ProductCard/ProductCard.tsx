import { Product } from 'types/Product.type'

import './ProductCard.css'

type ProductCardProps = Omit<Product, 'category'> & {
  currentQuantity?: number
  setCartData: (id: string, inc: 1 | -1) => void
}

export const ProductCard = ({
  name,
  description,
  price,
  currentQuantity = 0,
  image_url,
  id,
  setCartData,
}: ProductCardProps) => {
  return (
    <article className="product-card" data-testid={id}>
      <img
        className="product-card__image"
        src={image_url ?? 'https://placehold.co/192x192'}
        alt={`image of product ${id} -  ${name}`}
      />
      <h1 className="product-card__title">{name}</h1>
      <h2 className="product-card__description">{description}</h2>
      <div className="product-card__price">{price} €</div>
      <footer>
        <span>{currentQuantity} ud.</span>
        <button
          data-testid={`product-card__decrement`}
          onClick={() => setCartData(String(id), -1)}
        >
          -
        </button>
        <button
          data-testid={`product-card__increment`}
          onClick={() => setCartData(String(id), 1)}
        >
          +
        </button>
      </footer>
    </article>
  )
}
