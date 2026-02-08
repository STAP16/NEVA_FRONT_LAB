import Header from './components/Header/Header'
import './App.css'
import { HeroScreen, SecondScreen, DirectionsScreen } from './pages'

function App() {
	return (
		<>
			<Header />
			<HeroScreen />
			<SecondScreen />
			{/* Экран 3 - Детальные направления */}
			<DirectionsScreen />
		</>
	)
}

export default App
