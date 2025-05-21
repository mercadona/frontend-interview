import { Link } from 'react-router-dom'

import { PATHS } from 'pages/paths'
import mercaLogo from 'system-ui/assets/merca-logo.svg'

import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <Link to={PATHS.HOME}>
        <img src={mercaLogo} alt="Home" />
      </Link>
      <Link className="header__link" to={PATHS.LOGIN}>
        Login
      </Link>
    </header>
  )
}

export { Header }
