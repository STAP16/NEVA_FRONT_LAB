import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getPathnameFromTo, markRouteScrollReset } from './routeScrollReset'

export function useRouteNavigate() {
	const navigate = useNavigate()
	const location = useLocation()

	return useCallback((to, options) => {
		const nextPathname = getPathnameFromTo(to)
		if (nextPathname && nextPathname !== location.pathname) {
			markRouteScrollReset()
		}
		navigate(to, options)
	}, [location.pathname, navigate])
}
