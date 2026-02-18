import { motion } from 'framer-motion'
import nevikImg from '../../../assets/NEVIK_FOR_ABOUT_FIRST_SCREEN.png'
import bgImg from '../../../assets/BG_FOR_ABOUT_FIRST_SCREEN.png'
import './AboutHero.css'

const stagger = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 }
	}
}

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const IconTeam = () => (
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="10" cy="8" r="3.5" stroke="#2c5aa0" strokeWidth="1.8" />
		<path d="M3 21c0-3.5 3-6 7-6s7 2.5 7 6" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<circle cx="20" cy="9.5" r="2.8" stroke="#2c5aa0" strokeWidth="1.8" />
		<path d="M22 21c2.5-.5 4-2.5 4-4.5 0-2.5-2-4.5-5-5" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
	</svg>
)

const IconTarget = () => (
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="14" cy="14" r="11" stroke="#2c5aa0" strokeWidth="1.8" />
		<circle cx="14" cy="14" r="7" stroke="#2c5aa0" strokeWidth="1.8" />
		<circle cx="14" cy="14" r="3" fill="#2c5aa0" />
	</svg>
)

const IconSprint = () => (
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16 3L10 14h5l-3 11 10-13h-6l4-9H16z" fill="#2c5aa0" />
	</svg>
)

const IconTrophy = () => (
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M8 4h12v8c0 3.3-2.7 6-6 6s-6-2.7-6-6V4z" stroke="#2c5aa0" strokeWidth="1.8" />
		<path d="M8 7H5c0 3 1.5 5 3 5.5" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M20 7h3c0 3-1.5 5-3 5.5" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M14 18v3" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M9 24h10" stroke="#2c5aa0" strokeWidth="1.8" strokeLinecap="round" />
		<path d="M11 24v-3h6v3" stroke="#2c5aa0" strokeWidth="1.8" />
	</svg>
)

const points = [
	{
		icon: <IconTeam />,
		text: 'Работа в командах 3–5 человек'
	},
	{
		icon: <IconTarget />,
		text: 'Настоящие задачи: колледж, бизнес, стартап'
	},
	{
		icon: <IconSprint />,
		text: 'Спринты и дедлайны как в IT-компании'
	},
	{
		icon: <IconTrophy />,
		text: 'Финальная защита результата'
	}
]

const notList = [
	'Это не курс с видео-уроками',
	'Это не бесплатная стажировка с хаосом',
	'Это не хакатон на выходные'
]

export function AboutHero() {
	return (
		<section className="about-hero">
			<motion.div
				className="about-hero__left"
				variants={stagger}
				initial="hidden"
				animate="visible"
			>
				<motion.span
					className="about-hero__label"
					variants={fadeUp}
				>
					О лаборатории
				</motion.span>

				<motion.h1
					className="about-hero__title"
					variants={fadeUp}
				>
					NEVA LAB — проектная
					<br />
					лаборатория
				</motion.h1>

				<motion.p
					className="about-hero__subtitle"
					variants={fadeUp}
				>
					сделано студентами для студентов с использованием AI
				</motion.p>

				<motion.div
					className="about-hero__points"
					variants={fadeUp}
				>
					{points.map((point, i) => (
						<div
							className="about-hero__point"
							key={i}
						>
							<span className="about-hero__point-icon">{point.icon}</span>
							<span className="about-hero__point-text">{point.text}</span>
						</div>
					))}
				</motion.div>

				<motion.div
					className="about-hero__not-block"
					variants={fadeUp}
				>
					<h3 className="about-hero__not-title">Чем мы НЕ являемся</h3>
					<div className="about-hero__not-list">
						{notList.map((item, i) => (
							<div
								className="about-hero__not-item"
								key={i}
							>
								<span className="about-hero__not-cross">✕</span>
								<span>{item}</span>
							</div>
						))}
					</div>
				</motion.div>
			</motion.div>

			<motion.div
				className="about-hero__right"
				initial={{ opacity: 0, x: 40 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.7, delay: 0.3 }}
			>
				<img
					className="about-hero__bg"
					src={bgImg}
					alt=""
					aria-hidden="true"
				/>
				<img
					className="about-hero__nevik"
					src={nevikImg}
					alt="NEVIK — маскот NEVA LAB"
				/>
			</motion.div>
		</section>
	)
}
