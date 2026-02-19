import { useLayoutEffect } from 'react'
import { AboutHero } from './AboutHero/AboutHero'
import { HowItWorks } from './HowItWorks/HowItWorks'
import { TeamScreen } from './TeamScreen/TeamScreen'
import { ResultsScreen } from './ResultsScreen/ResultsScreen'
import { ForWhomScreen } from './ForWhomScreen/ForWhomScreen'
import { AboutCTA } from './AboutCTA/AboutCTA'

export function AboutPage() {
	useLayoutEffect(() => {
		const shouldResetByRedirect = sessionStorage.getItem('about:reset-scroll') === '1'
		if (!shouldResetByRedirect) return

		const scrollingElement = document.scrollingElement || document.documentElement
		const html = document.documentElement
		const body = document.body
		const prevHtmlScrollBehavior = html.style.scrollBehavior
		const prevBodyScrollBehavior = body.style.scrollBehavior

		html.style.scrollBehavior = 'auto'
		body.style.scrollBehavior = 'auto'
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
		scrollingElement.scrollTop = 0
		document.documentElement.scrollTop = 0
		document.body.scrollTop = 0

		requestAnimationFrame(() => {
			window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
			html.style.scrollBehavior = prevHtmlScrollBehavior
			body.style.scrollBehavior = prevBodyScrollBehavior
		})

		sessionStorage.removeItem('about:reset-scroll')
	}, [])

	return (
		<>
			<AboutHero />
			<HowItWorks />
			<TeamScreen />
			<ResultsScreen />
			<ForWhomScreen />
			<AboutCTA />
		</>
	)
}
