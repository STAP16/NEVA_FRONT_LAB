import { motion } from 'framer-motion'
import './HeroSection.css'

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

function HeroSection() {
	const handleCta = () => {
		const form = document.getElementById('contact-form')
		if (form) {
			form.scrollIntoView({ behavior: 'smooth' })
			return
		}
		const nextSection = document.querySelector('.hero')?.nextElementSibling
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<section className="hero">
			<motion.div
				className="hero__content"
				variants={stagger}
				initial="hidden"
				animate="visible"
			>
				<motion.span
					className="hero__brand"
					variants={fadeUp}
				>
					NEVA
				</motion.span>

				<motion.h1
					className="hero__title"
					variants={fadeUp}
				>
					Прокачай IT-навыки в команде единомышленников
				</motion.h1>

				<motion.p
					className="hero__subtitle"
					variants={fadeUp}
				>
					Студенческая лаборатория цифровых технологий — делай настоящие проекты, получай менторство
					и собирай портфолио ещё до выпуска
				</motion.p>

				<motion.div
					className="hero__directions"
					variants={fadeUp}
				>
					<span className="hero__direction">Веб-разработка</span>
					<span className="hero__direction">Мобильные приложения</span>
					<span className="hero__direction">Искусственный интеллект</span>
					<span className="hero__direction">UI/UX Дизайн</span>
					<span className="hero__direction">Data Science</span>
				</motion.div>

				<motion.div
					className="hero__cta-block"
					variants={fadeUp}
				>
					<button
						className="hero__cta"
						onClick={handleCta}
					>
						Присоединиться
					</button>
				</motion.div>
			</motion.div>

			<motion.div
				className="hero__scroll-hint"
				animate={{ y: [0, 8, 0] }}
				transition={{ repeat: Infinity, duration: 1.5 }}
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M12 5v14M5 12l7 7 7-7"
						stroke="#5a7aa0"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			</motion.div>
		</section>
	)
}

export default HeroSection
