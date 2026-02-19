const ROUTE_SCROLL_RESET_KEY = 'app:reset-scroll-on-route'
const ROUTE_TRANSITION_START_EVENT = 'app:route-transition-start'
const ROUTE_TRANSITION_DURATION = 180
let isRouteTransitionLocked = false

function getPathnameFromTo(to) {
	if (typeof to === 'string') {
		if (!to.startsWith('/')) return null
		try {
			return new URL(to, 'https://local.app').pathname
		} catch {
			return to.split('?')[0].split('#')[0]
		}
	}

	if (to && typeof to === 'object' && typeof to.pathname === 'string') {
		return to.pathname
	}

	return null
}

function shouldHandlePrimaryNavigation(event, target) {
	if (event.defaultPrevented) return false
	if (event.button !== 0) return false
	if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return false
	if (target && target !== '_self') return false
	return true
}

function markRouteScrollReset() {
	sessionStorage.setItem(ROUTE_SCROLL_RESET_KEY, '1')
}

function consumeRouteScrollReset() {
	const shouldReset = sessionStorage.getItem(ROUTE_SCROLL_RESET_KEY) === '1'
	if (shouldReset) {
		sessionStorage.removeItem(ROUTE_SCROLL_RESET_KEY)
	}
	return shouldReset
}

function resetScrollInstant() {
	const html = document.documentElement
	const body = document.body
	const scrollingElement = document.scrollingElement || html
	const prevHtmlScrollBehavior = html.style.scrollBehavior
	const prevBodyScrollBehavior = body.style.scrollBehavior

	html.style.scrollBehavior = 'auto'
	body.style.scrollBehavior = 'auto'
	window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
	scrollingElement.scrollTop = 0
	html.scrollTop = 0
	body.scrollTop = 0

	requestAnimationFrame(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
		html.style.scrollBehavior = prevHtmlScrollBehavior
		body.style.scrollBehavior = prevBodyScrollBehavior
	})
}

function startRouteTransition(navigateFn, duration = ROUTE_TRANSITION_DURATION) {
	if (isRouteTransitionLocked) return false
	isRouteTransitionLocked = true

	window.dispatchEvent(
		new CustomEvent(ROUTE_TRANSITION_START_EVENT, {
			detail: { duration }
		})
	)

	window.setTimeout(() => {
		resetScrollInstant()
		navigateFn()
		window.setTimeout(() => {
			isRouteTransitionLocked = false
		}, 120)
	}, duration)

	return true
}

export {
	consumeRouteScrollReset,
	getPathnameFromTo,
	markRouteScrollReset,
	ROUTE_TRANSITION_DURATION,
	ROUTE_TRANSITION_START_EVENT,
	resetScrollInstant,
	startRouteTransition,
	shouldHandlePrimaryNavigation
}
