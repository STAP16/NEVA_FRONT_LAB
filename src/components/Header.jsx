import './Header.css'

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <a href="#about" className="header__link">О лаборатории</a>
        <a href="#directions" className="header__link">Направления</a>
        <a href="#projects" className="header__link">Проекты</a>
        <a href="#contacts" className="header__link">Контакты</a>
      </nav>
    </header>
  )
}

export default Header
