import './ProductCard.css'

export const ProductCard = () => {
  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src="https://placehold.co/192x192"
        alt=""
      />
      <h1 className="product-card__title">Manchego Cheese</h1>
      <h2 className="product-card__description">
        Aged Manchego cheese with a strong flavor.
      </h2>
      <div className="product-card__price">3,50 €</div>
      <footer>
        <span>0 ud.</span>
        <button>-</button>
        <button>+</button>
      </footer>
    </article>
  )
}
