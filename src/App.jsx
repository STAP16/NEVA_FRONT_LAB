import Header from './components/Header/Header'
import './App.css'
import { HeroScreen } from './pages'

function App() {
	return (
		<>
			<Header />
			{/* Начальный экран - Главный*/}
			<HeroScreen />
			<div style={{ height: '100vh' }}>Next</div>
		</>
	)
}

export default App
