import { AboutHero } from './AboutHero/AboutHero'
import { HowItWorks } from './HowItWorks/HowItWorks'
import { TeamScreen } from './TeamScreen/TeamScreen'
import { ResultsScreen } from './ResultsScreen/ResultsScreen'
import { ForWhomScreen } from './ForWhomScreen/ForWhomScreen'
import { AboutCTA } from './AboutCTA/AboutCTA'

export function AboutPage() {
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
