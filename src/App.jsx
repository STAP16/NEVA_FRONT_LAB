import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { AboutPage } from './pages/AboutPage/AboutPage'
import './App.css'
import {
	DirectionsPage,
	HeroScreen,
	SecondScreen,
	ProcessScreen,
	DirectionsScreen,
	FifthScreen,
	SixthScreen
} from './pages'

function HomePage() {
	return (
		<>
			<HeroScreen />
			<SecondScreen />
			{/* Экран 3 - Детальные направления */}
			<DirectionsScreen />
			<ProcessScreen />
			<FifthScreen />
			<SixthScreen />
		</>
	)
}

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/about"
					element={<AboutPage />}
				/>
				<Route
					path="/directions"
					element={<DirectionsPage />}
				/>
			</Routes>
			<Footer />
		</>
	)
}

export default App
