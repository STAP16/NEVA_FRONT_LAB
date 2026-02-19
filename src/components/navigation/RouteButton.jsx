import { useLocation, useNavigate } from 'react-router-dom'
import { getPathnameFromTo, markRouteScrollReset } from './routeScrollReset'

export function RouteButton({ to, onClick, replace, state, ...props }) {
	const navigate = useNavigate()
	const location = useLocation()

	const handleClick = event => {
		onClick?.(event)
		if (event.defaultPrevented) return

		const nextPathname = getPathnameFromTo(to)
		if (nextPathname && nextPathname !== location.pathname) {
			markRouteScrollReset()
		}

		navigate(to, { replace, state })
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			{...props}
		/>
	)
}
