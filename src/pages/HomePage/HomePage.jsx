import {
	HeroScreen,
	SecondScreen,
	ProcessScreen,
	DirectionsScreen,
	FifthScreen,
	FaqScreen,
	SixthScreen
} from '../index'

export function HomePage() {
	return (
		<>
			<HeroScreen />
			<SecondScreen />
			<DirectionsScreen />
			<ProcessScreen />
			<FifthScreen />
			<FaqScreen />
			<SixthScreen />
		</>
	)
}
