import Header from './components/Header/Header'
import './App.css'
import { HeroScreen, SolutionScreen } from './pages'

function App() {
	return (
		<>
			<Header />
			{/* Начальный экран - Главный*/}
			<HeroScreen />
			{/* Экран 3 - Решение / Что мы делаем */}
			<SolutionScreen />
		</>
	)
}

export default App
