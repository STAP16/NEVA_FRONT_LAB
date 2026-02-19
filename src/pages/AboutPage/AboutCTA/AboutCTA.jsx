import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRouteNavigate } from '../../../components/navigation'
import bgImg from '../../../assets/BG_FOR_WANT_TO_JOIN.png'
import mascotImg from '../../../assets/NEVA_CAP_1.png'
import './AboutCTA.css'

const IconCalendar = () => (
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="3" y="5" width="22" height="20" rx="3" stroke="#2c5aa0" strokeWidth="1.8" />
		<path d="M3 11h22" stroke="#2c5aa0" strokeWidth="1.8" />
		<path d="M9 3v4" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M19 3v4" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<circle cx="14" cy="18" r="2" fill="#2c5aa0" />
	</svg>
)

const IconFree = () => (
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="4" y="8" width="20" height="14" rx="2" stroke="#2c5aa0" strokeWidth="1.8" />
		<path d="M4 12h20" stroke="#2c5aa0" strokeWidth="1.8" />
		<path d="M9 17h4" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M17 17h2" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M13 8L11 5h6l-2 3" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)

const IconCompass = () => (
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14 3v3" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M14 22v3" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M3 14h3" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M22 14h3" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<circle cx="14" cy="14" r="8" stroke="#2c5aa0" strokeWidth="1.8" />
		<path d="M10 18l2-6 6-2-2 6-6 2z" fill="#2c5aa0" />
	</svg>
)

const IconShield = () => (
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14 3L4 7v6c0 6.5 4.3 11.5 10 13 5.7-1.5 10-6.5 10-13V7L14 3z" stroke="#2c5aa0" strokeWidth="1.8" strokeLinejoin="round" />
		<path d="M10 14l3 3 5-6" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function AboutCTA() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const navigate = useRouteNavigate()

	const handleApply = () => {
		navigate('/')
		setTimeout(() => {
			const el = document.getElementById('start-direction')
			if (el) el.scrollIntoView({ behavior: 'smooth' })
		}, 100)
	}

	const handleDirections = () => {
		navigate('/')
		setTimeout(() => {
			const el = document.getElementById('directions')
			if (el) el.scrollIntoView({ behavior: 'smooth' })
		}, 100)
	}

	const handleProjects = () => {
		navigate('/')
		setTimeout(() => {
			const el = document.getElementById('projects')
			if (el) el.scrollIntoView({ behavior: 'smooth' })
		}, 100)
	}

	return (
		<section
			className="about-cta"
			id="about-cta"
		>
			<img
				className="about-cta__bg"
				src={bgImg}
				alt=""
				aria-hidden="true"
			/>
			<div
				className="about-cta__container"
				ref={ref}
			>
				<motion.div
					className="about-cta__left"
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
					<motion.h2
						className="about-cta__title"
						variants={fadeUp}
					>
						Готов стать частью
						<br />
						<span className="about-cta__title-indent">лаборатории?</span>
					</motion.h2>

					<motion.p
						className="about-cta__text"
						variants={fadeUp}
					>
						Оставь заявку — обсудим направление и формат участия. Не нужен опыт. Нужно желание
						делать.
					</motion.p>

					<motion.div
						className="about-cta__extras"
						variants={fadeUp}
					>
						<div className="about-cta__extra">
							<span className="about-cta__extra-icon"><IconCalendar /></span>
							<span>Старт нового потока — каждый месяц</span>
						</div>
						<div className="about-cta__extra">
							<span className="about-cta__extra-icon"><IconFree /></span>
							<span>Участие бесплатное</span>
						</div>
						<div className="about-cta__extra">
							<span className="about-cta__extra-icon"><IconCompass /></span>
							<span>Подберём направление под твои цели</span>
						</div>
						<div className="about-cta__extra">
							<span className="about-cta__extra-icon"><IconShield /></span>
							<span>Поддержка на всём пути</span>
						</div>
					</motion.div>

					<motion.div
						className="about-cta__nav-buttons"
						variants={fadeUp}
					>
						<button
							className="about-cta__nav-btn"
							onClick={handleDirections}
						>
							Выбрать направление
						</button>
						<button
							className="about-cta__nav-btn"
							onClick={handleProjects}
						>
							Смотреть проекты
						</button>
					</motion.div>

					<motion.div
						className="about-cta__button-block"
						variants={fadeUp}
					>
						<button
							className="about-cta__button"
							onClick={handleApply}
						>
							Подать заявку
						</button>
						<p className="about-cta__hint">Ответим в течение 24 часов</p>
					</motion.div>
				</motion.div>

				<motion.div
					className="about-cta__right"
					initial={{ opacity: 0, x: 40 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.7, delay: 0.3 }}
				>
					<img
						className="about-cta__mascot"
						src={mascotImg}
						alt="NEVIK — маскот NEVA LAB"
					/>
				</motion.div>
			</div>
		</section>
	)
}
