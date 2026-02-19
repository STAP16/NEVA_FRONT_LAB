import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
	getPathnameFromTo,
	markRouteScrollReset,
	startRouteTransition,
	shouldHandlePrimaryNavigation
} from './routeScrollReset'

export function RouteLink({ to, onClick, target, replace, state, ...props }) {
	const location = useLocation()
	const navigate = useNavigate()

	const handleClick = event => {
		onClick?.(event)
		if (!shouldHandlePrimaryNavigation(event, target)) return

		const nextPathname = getPathnameFromTo(to)
		if (nextPathname && nextPathname !== location.pathname) {
			event.preventDefault()
			markRouteScrollReset()
			startRouteTransition(() => {
				navigate(to, { replace, state })
			})
		}
	}

	return (
		<Link
			to={to}
			target={target}
			onClick={handleClick}
			replace={replace}
			state={state}
			{...props}
		/>
	)
}
