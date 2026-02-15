import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
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
			<div className="header__logo">NEVA</div>
			<nav className="header__nav">
				<NavLink to="/about" className="header__link">
					О лаборатории
				</NavLink>
				<NavLink to="/directions" className="header__link">
					Направления
				</NavLink>
				<NavLink to="/projects" className="header__link">
					Проекты
				</NavLink>
				<NavLink to="/contacts" className="header__link">
					Контакты
				</NavLink>
			</nav>
		</header>
	)
}

export default Header
