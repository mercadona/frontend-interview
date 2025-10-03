import { Product } from 'types/Product.type'

import './ProductCard.css'

type ProductCardProps = Omit<Product, 'category'> & { currentQuantity?: number }

export const ProductCard = ({
  name,
  description,
  price,
  currentQuantity = 0,
  image_url,
  id,
}: ProductCardProps) => {
  return (
    <article className="product-card" data-product-id={id}>
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
        <button>-</button>
        <button>+</button>
      </footer>
    </article>
  )
}
