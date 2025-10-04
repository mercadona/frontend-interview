import { useContext } from 'react'
import { CartContext } from 'store/cartData.context'

import { ProductCard } from 'system-ui/ProductCard'

import { useHomeData } from './Home.hook'
import './Home.styles.css'

export const Home = () => {
  const { products } = useHomeData()
  const { updateCart: setCartData } = useContext(CartContext)

  return (
    <section className="Home-ProductList" data-testid="Home-ProductList">
      {products.map(({ id, price, name, image_url, description }) => (
        <ProductCard
          key={id}
          price={price}
          id={id}
          name={name}
          image_url={image_url}
          description={description}
          setCartData={setCartData}
        />
      ))}
    </section>
  )
}
