import { useEffect, useLayoutEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {
	consumeRouteScrollReset,
	ROUTE_TRANSITION_START_EVENT,
	resetScrollInstant
} from './components/navigation/routeScrollReset'
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

const pageTransition = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { duration: 0.22, ease: 'easeOut' } },
	exit: { opacity: 0, transition: { duration: 0.12, ease: 'easeIn' } }
}

function PageWrapper({ children }) {
	return (
		<motion.div
			variants={pageTransition}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{children}
		</motion.div>
	)
}

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
	const location = useLocation()
	const [isRouteWipeActive, setIsRouteWipeActive] = useState(false)

	useLayoutEffect(() => {
		if (!consumeRouteScrollReset()) return
		resetScrollInstant()
	}, [location.pathname])

	useEffect(() => {
		const handleTransitionStart = event => {
			const duration = Number(event?.detail?.duration) || 180
			setIsRouteWipeActive(true)
			window.setTimeout(() => {
				setIsRouteWipeActive(false)
			}, duration + 220)
		}

		window.addEventListener(ROUTE_TRANSITION_START_EVENT, handleTransitionStart)
		return () => {
			window.removeEventListener(ROUTE_TRANSITION_START_EVENT, handleTransitionStart)
		}
	}, [])

	return (
		<>
			<div className={`app__route-wipe${isRouteWipeActive ? ' app__route-wipe--active' : ''}`} />
			<Header />
			<AnimatePresence mode="wait">
				<Routes
					location={location}
					key={location.pathname}
				>
					<Route
						path="/"
						element={
							<PageWrapper>
								<HomePage />
							</PageWrapper>
						}
					/>
					<Route
						path="/about"
						element={
							<PageWrapper>
								<AboutPage />
							</PageWrapper>
						}
					/>
					<Route
						path="/directions"
						element={
							<PageWrapper>
								<DirectionsPage />
							</PageWrapper>
						}
					/>
				</Routes>
			</AnimatePresence>
			<Footer />
		</>
	)
}

export default App
