import { ProductCard } from 'system-ui/ProductCard'

import { useHomeData } from './Home.hook'
import './Home.styles.css'

type HomeProps = {
  setCartData: (id: string, inc: 1 | -1) => void // TODO Refactor to types file
}

export const Home = ({ setCartData }: HomeProps) => {
  const { products } = useHomeData()
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
