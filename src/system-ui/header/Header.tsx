import { ShoppingCartButton } from 'system-ui/ShoppingCartButton'
import mercaLogo from 'system-ui/assets/merca-logo.svg'

import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <img src={mercaLogo} alt="Logo de Mercadona" />
      <ShoppingCartButton />
    </header>
  )
}

export { Header }
