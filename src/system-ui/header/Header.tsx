import mercaLogo from 'system-ui/assets/merca-logo.svg'

import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <img src={mercaLogo} alt="Home" />
    </header>
  )
}

export { Header }
