import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DirectionDetail, VisualSection } from './components'
import { directionsData } from './direction-data'
import './DirectionsScreen.css'
import { NavLink } from 'react-router-dom'

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 }
	}
}

function DirectionsScreen() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-80px' })

	return (
		<section
			className="directions"
			id="projects"
			ref={ref}
		>
			<div className="directions__container">
				<motion.h2
					className="directions__title"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
				>
					Собираем команды под задачи.
					<br />
					От идеи — до работающего решения.
					<p className="directions__subtitle">Выбери направление, в котором будешь расти.</p>
				</motion.h2>

				<motion.div
					className="directions__cards"
					variants={stagger}
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
				>
					{directionsData.map(direction => (
						<motion.div key={direction.type} variants={fadeUp} style={{ display: 'flex' }}>
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
					))}
				</motion.div>

				<VisualSection />

				<motion.div
					className="directions__cta"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<NavLink
						to="/portfolio"
						className="directions__cta-button"
					>
						Смотреть реализованные проекты →
					</NavLink>
				</motion.div>
			</div>
		</section>
	)
}

export { DirectionsScreen }
