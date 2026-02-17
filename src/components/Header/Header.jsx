import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
	const [scrolled, setScrolled] = useState(false)
	const { pathname } = useLocation()
	const prevPathname = useRef(pathname)

	useEffect(() => {
		if (prevPathname.current !== pathname) {
			window.scrollTo(0, 0)
			prevPathname.current = pathname
		}
	}, [pathname])

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header className={`header${scrolled ? ' header--scrolled' : ''}`}>
			<Link to="/" className="header__logo">NEVA</Link>
			<nav className="header__nav">
				<NavLink to="/about" className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}>
					О лаборатории
				</NavLink>
				<NavLink to="/directions" className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}>
					Направления
				</NavLink>
				<NavLink to="/projects" className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}>
					Проекты
				</NavLink>
				<NavLink to="/contacts" className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}>
					Контакты
				</NavLink>
			</nav>
		</header>
	)
}

export default Header
