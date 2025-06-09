import './Product.css'

export const Product = () => {
  return (
    <article className="product">
      <img
        className="product__image"
        src="https://placehold.co/192x192"
        alt=""
      />
      <h1 className="product__title">Manchego Cheese</h1>
      <h2 className="product__description">
        Aged Manchego cheese with a strong flavor.
      </h2>
      <div className="product__price">3,50 €</div>
      <footer>
        <span>0 ud.</span>
        <button>-</button>
        <button>+</button>
      </footer>
    </article>
  )
}
