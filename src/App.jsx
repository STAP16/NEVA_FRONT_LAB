import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {
	consumeRouteScrollReset,
	ROUTE_TRANSITION_START_EVENT,
	resetScrollInstant
} from './components/navigation/routeScrollReset'
import './App.css'

const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage').then(m => ({ default: m.AboutPage })))
const DirectionsPage = lazy(() => import('./pages/DirectionsPage').then(m => ({ default: m.DirectionsPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage').then(m => ({ default: m.ContactsPage })))
const JoinSuccessPage = lazy(() => import('./pages/JoinSuccessPage/JoinSuccessPage').then(m => ({ default: m.JoinSuccessPage })))

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
			<Suspense fallback={null}>
			<AnimatePresence mode="wait">
				<Routes
					location={location}
					key={location.pathname}
				>
					<Route
						path="/"
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
					<Route
						path="/projects"
						element={
							<PageWrapper>
								<ProjectsPage />
							</PageWrapper>
						}
					/>
					<Route
						path="/contacts"
						element={
							<PageWrapper>
								<ContactsPage />
							</PageWrapper>
						}
					/>
					<Route
						path="/projects/join-success"
						element={
							<PageWrapper>
								<JoinSuccessPage />
							</PageWrapper>
						}
					/>
				</Routes>
			</AnimatePresence>
			</Suspense>
			<Footer />
		</>
	)
}

export default App
