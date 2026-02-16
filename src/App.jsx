import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { HomePage } from './pages/HomePage/HomePage'
import { AboutPage } from './pages/AboutPage/AboutPage'
import './App.css'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
