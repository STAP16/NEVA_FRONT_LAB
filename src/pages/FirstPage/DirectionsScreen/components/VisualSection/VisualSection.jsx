import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './VisualSection.css'
import nevikMascot from './nevik.png'

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 }
	}
}

function VisualSection() {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

	const visuals = [
		{
			title: 'Интерфейсы приложений',
			description: 'Скриншоты созданных сервисов: расписание, система бронирования',
			placeholder: '📱'
		},
		{
			title: 'Процесс работы',
			description: 'Живое фото обсуждения у доски или за ноутбуками в лаборатории',
			placeholder: '💻'
		},
		{
			title: 'Презентация проектов',
			description: 'Кадр с презентации проекта заказчику или жюри',
			placeholder: '🎤'
		}
	]

	return (
		<div
			ref={sectionRef}
			className="visual-section"
		>
			<div className="visual-section__layout">
				<motion.div
					className="visual-section__content"
					variants={stagger}
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
				>
					<motion.h3 className="visual-section__title" variants={fadeUp}>
						Как это выглядит
					</motion.h3>
					<div className="visual-section__grid">
						{visuals.map((visual, index) => (
							<motion.div
								key={index}
								className={`visual-section__item ${index === 2 ? 'visual-section__item--wide' : ''}`}
								variants={fadeUp}
							>
								<div className="visual-section__placeholder">
									<span className="visual-section__icon">{visual.placeholder}</span>
								</div>
								<h4 className="visual-section__item-title">{visual.title}</h4>
								<p className="visual-section__item-description">{visual.description}</p>
							</motion.div>
						))}
					</div>
				</motion.div>

				<div className="visual-section__mascot">
					{/* Маскот появляется первым */}
					<motion.img
						src={nevikMascot}
						alt="Маскот NEVA"
						className="visual-section__mascot-image"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={isInView ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 0.6, delay: 0.2 }}
					/>
					{/* Бабл появляется после маскота */}
					<motion.div
						className="visual-section__bubble"
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
						transition={{ duration: 0.6, delay: 0.8 }}
					>
						Интересно, какие проекты уже запустили?
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export { VisualSection }
