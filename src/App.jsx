import Header from './components/Header/Header'
import './App.css'
import { HeroScreen, DirectionsScreen } from './pages'

function App() {
	return (
		<>
			<Header />
			{/* Начальный экран - Главный*/}
			<HeroScreen />

			{/* Экран 3 - Детальные направления */}
			<DirectionsScreen />
		</>
	)
}

export default App
