import { motion } from 'framer-motion'
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

const points = [
	{
		icon: '👥',
		text: 'Работа в командах 3–5 человек'
	},
	{
		icon: '🎯',
		text: 'Настоящие задачи: колледж, бизнес, стартап'
	},
	{
		icon: '⚡',
		text: 'Спринты и дедлайны как в IT-компании'
	},
	{
		icon: '🏆',
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
				className="about-hero__content"
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
					NEVA LAB — проектная лаборатория
				</motion.h1>

				<motion.p
					className="about-hero__subtitle"
					variants={fadeUp}
				>
					созданная студентами для студентов
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
		</section>
	)
}
