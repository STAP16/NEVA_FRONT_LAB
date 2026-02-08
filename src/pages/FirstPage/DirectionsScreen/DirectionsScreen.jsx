import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DirectionDetail, VisualSection } from './components'
import { directionsData, directionsTypes } from './direction-data'

import './DirectionsScreen.css'
import { NavLink } from 'react-router-dom'

const CHANGE_DIRECTIONS_TIMEOUT = 4500

function DirectionsScreen() {
	const [currentDirectionType, setCurrentDirectionType] = useState(directionsTypes.COLLEGE)
	const [isUserClickedOnDirection, setIsUserClickedOnDirection] = useState(false)

	const handleCurrentDirection = ({ target }) => {
		setIsUserClickedOnDirection(true)
		return setCurrentDirectionType(target.id)
	}

	const direction = directionsData.find(direction => direction.type === currentDirectionType)

	useEffect(() => {
		if (isUserClickedOnDirection) return

		const types = Object.values(directionsTypes)

		const intervalId = setInterval(() => {
			setCurrentDirectionType(prev => {
				const currentIndex = types.indexOf(prev)
				const nextIndex = (currentIndex + 1) % types.length
				return types[nextIndex]
			})
		}, CHANGE_DIRECTIONS_TIMEOUT)

		return () => clearInterval(intervalId)
	}, [isUserClickedOnDirection])

	return (
		<section
			className="directions"
			id="projects"
		>
			<div className="directions__container">
				<h2 className="directions__title">
					Собираем команды под задачи.
					<br />
					От идеи — до работающего решения.
					<p className="directions__subtitle">
						Выбери направление, в котором будешь расти.
						<br />
						Все они дают реальный опыт, а не теорию.
					</p>
				</h2>

				<div className="current-direction-type-row">
					<div
						id="college"
						className={currentDirectionType === 'college' ? 'active' : ''}
						onClick={handleCurrentDirection}
					>
						Для колледжа
					</div>
					<div
						id="commerce"
						className={currentDirectionType === 'commerce' ? 'active' : ''}
						onClick={handleCurrentDirection}
					>
						Для коммерции
					</div>
					<div
						id="yourself"
						className={currentDirectionType === 'yourself' ? 'active' : ''}
						onClick={handleCurrentDirection}
					>
						Для личных целей
					</div>
				</div>

				<div className="directions__cards">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentDirectionType}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
						>
							<DirectionDetail
								icon={direction.icon}
								category={direction.category}
								type={direction.type}
								title={direction.title}
								description={direction.description}
								forYou={direction.forYou}
								benefits={direction.benefits}
								extra={direction.extra}
							/>
						</motion.div>
					</AnimatePresence>
				</div>

				<VisualSection />

				<div className="directions__cta">
					<NavLink
						to="/portfolio"
						className="directions__cta-button"
					>
						Смотреть реализованные проекты →
					</NavLink>
				</div>
			</div>
		</section>
	)
}

export { DirectionsScreen }
