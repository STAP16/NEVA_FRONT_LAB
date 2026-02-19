import { useState, useEffect } from 'react'
import { RouteLink, RouteNavLink } from '../navigation'
import './Header.css'

function Header() {
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header className={`header${scrolled ? ' header--scrolled' : ''}`}>
			<RouteLink to="/" className="header__logo">NEVA</RouteLink>
			<nav className="header__nav">
				<RouteNavLink to="/about" className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}>
					О лаборатории
				</RouteNavLink>
				<RouteNavLink to="/directions" className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}>
					Направления
				</RouteNavLink>
				<RouteNavLink to="/projects" className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}>
					Проекты
				</RouteNavLink>
				<RouteNavLink to="/contacts" className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}>
					Контакты
				</RouteNavLink>
			</nav>
		</header>
	)
}

export default Header
