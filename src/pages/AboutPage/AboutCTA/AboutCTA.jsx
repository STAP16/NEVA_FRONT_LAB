import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './AboutCTA.css'

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function AboutCTA() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/')
		setTimeout(() => {
			const el = document.getElementById('start-direction')
			if (el) el.scrollIntoView({ behavior: 'smooth' })
		}, 100)
	}

	return (
		<section className="about-cta" id="about-cta">
			<div className="about-cta__container" ref={ref}>
				<motion.div
					className="about-cta__content"
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: { staggerChildren: 0.15 }
						}
					}}
				>
					<motion.h2 className="about-cta__title" variants={fadeUp}>
						Готов стать частью лаборатории?
					</motion.h2>

					<motion.p className="about-cta__text" variants={fadeUp}>
						Оставь заявку — обсудим направление и формат участия.
						Не нужен опыт. Нужно желание делать.
					</motion.p>

					<motion.div className="about-cta__button-block" variants={fadeUp}>
						<button className="about-cta__button" onClick={handleClick}>
							Подать заявку
						</button>
						<p className="about-cta__hint">Ответим в течение 24 часов</p>
					</motion.div>

					<motion.div className="about-cta__extras" variants={fadeUp}>
						<div className="about-cta__extra">
							<span className="about-cta__extra-icon">📅</span>
							<span>Старт нового потока — каждый месяц</span>
						</div>
						<div className="about-cta__extra">
							<span className="about-cta__extra-icon">💰</span>
							<span>Участие бесплатное</span>
						</div>
						<div className="about-cta__extra">
							<span className="about-cta__extra-icon">🎯</span>
							<span>Подберём направление под твои цели</span>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
