const ROUTE_SCROLL_RESET_KEY = 'app:reset-scroll-on-route'

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

export {
	consumeRouteScrollReset,
	getPathnameFromTo,
	markRouteScrollReset,
	resetScrollInstant,
	shouldHandlePrimaryNavigation
}
