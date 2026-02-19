import { NavLink, useLocation } from 'react-router-dom'
import {
	getPathnameFromTo,
	markRouteScrollReset,
	shouldHandlePrimaryNavigation
} from './routeScrollReset'

export function RouteNavLink({ to, onClick, target, ...props }) {
	const location = useLocation()

	const handleClick = event => {
		onClick?.(event)
		if (!shouldHandlePrimaryNavigation(event, target)) return

		const nextPathname = getPathnameFromTo(to)
		if (nextPathname && nextPathname !== location.pathname) {
			markRouteScrollReset()
		}
	}

	return (
		<NavLink
			to={to}
			target={target}
			onClick={handleClick}
			{...props}
		/>
	)
}
