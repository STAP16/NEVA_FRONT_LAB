import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
	return (
		<header className="header">
			<nav className="header__nav">
				<NavLink
					to="/about"
					className="header__link"
				>
					О лаборатории
				</NavLink>
				<NavLink
					to="/directions"
					className="header__link"
				>
					Направления
				</NavLink>
				<NavLink
					to="/projects"
					className="header__link"
				>
					Проекты
				</NavLink>
				<NavLink
					to="/contacts"
					className="header__link"
				>
					Контакты
				</NavLink>
			</nav>
		</header>
	)
}

export default Header
