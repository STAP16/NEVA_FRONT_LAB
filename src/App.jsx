import Header from './components/Header/Header'
import './App.css'
import { HeroScreen, SecondScreen, ProcessScreen, DirectionsScreen } from './pages'

function App() {
	return (
		<>
			<Header />
			<HeroScreen />
			<SecondScreen />
			{/* Экран 3 - Детальные направления */}
			<DirectionsScreen />
			<ProcessScreen />
		</>
	)
}

export default App
