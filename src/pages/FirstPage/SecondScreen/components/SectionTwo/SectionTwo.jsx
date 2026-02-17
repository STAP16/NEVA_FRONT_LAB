import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './SectionTwo.css'
import nevikRespect from '../../../../../assets/Nevik_respect.png'

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

function SectionTwo() {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

	return (
		<section
			ref={sectionRef}
			className="stories"
			id="directions"
		>
			<div className="stories__container">
				<motion.header
					className="stories__header"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
				>
					<h1 className="stories__title">Кем ты хочешь быть в следующем семестре?</h1>
				</motion.header>

				<div className="stories__layout">
					<div className="stories__mascot-col">
						<div className="stories__mascot">
							{/* Бабл появляется ПОСЛЕ маскота */}
							<motion.div
								className="stories__speech-bubble"
								initial={{ opacity: 0, y: 24, scale: 0.95 }}
								animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
								transition={{ duration: 0.6, delay: 0.8 }}
							>
								Смотри, что уже сделали студенты!
							</motion.div>
							{/* Маскот появляется первым */}
							<motion.img
								src={nevikRespect}
								alt="Маскот NEVA — Невик"
								className="stories__mascot-image"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={isInView ? { opacity: 1, scale: 1 } : {}}
								transition={{ duration: 0.6, delay: 0.3 }}
							/>
						</div>
					</div>

					<motion.div
						className="stories__cards-col"
						variants={stagger}
						initial="hidden"
						animate={isInView ? 'visible' : 'hidden'}
					>
						<div className="story-list">
							<motion.article className="story-card" variants={fadeUp}>
								<div
									className="story-card__media story-card__media--mvp"
									aria-hidden="true"
								>
									<div className="mock mock--mvp">
										<div className="mock__bar">
											<span className="mock__dot" />
											<span className="mock__dot" />
											<span className="mock__dot" />
										</div>
										<div className="mock__content">
											<div className="mock__pill" />
											<div className="mock__grid">
												<div className="mock__tile" />
												<div className="mock__tile" />
												<div className="mock__tile" />
												<div className="mock__tile" />
											</div>
										</div>
									</div>
								</div>
								<div className="story-card__content">
									<p className="story-card__label">Личное направление</p>
									<p className="story-card__quote">
										«С нуля собрал MVP приложения для поиска напарников на спорт. Сейчас проект
										тестируют первые пользователи».
									</p>
									<p className="story-card__meta">Имя, факультет</p>
								</div>
							</motion.article>

							<motion.article className="story-card" variants={fadeUp}>
								<div
									className="story-card__media story-card__media--landing"
									aria-hidden="true"
								>
									<div className="mock mock--landing">
										<div className="mock__bar">
											<span className="mock__dot" />
											<span className="mock__dot" />
											<span className="mock__dot" />
										</div>
										<div className="mock__hero" />
										<div className="mock__line" />
										<div className="mock__line mock__line--short" />
										<div className="mock__cta" />
									</div>
								</div>
								<div className="story-card__content">
									<p className="story-card__label">Коммерческое направление</p>
									<p className="story-card__quote">
										«В команде из трёх человек за два месяца разработали лендинг для local-бренда.
										Проект ушёл в продакшн».
									</p>
									<p className="story-card__meta">Имя, факультет</p>
								</div>
							</motion.article>

							<motion.article className="story-card" variants={fadeUp}>
								<div
									className="story-card__media story-card__media--bot"
									aria-hidden="true"
								>
									<div className="mock mock--phone">
										<div className="mock__speaker" />
										<div className="mock__chat mock__chat--left" />
										<div className="mock__chat mock__chat--right" />
										<div className="mock__chat mock__chat--left" />
										<div className="mock__chat mock__chat--right" />
									</div>
								</div>
								<div className="story-card__content">
									<p className="story-card__label">Колледж</p>
									<p className="story-card__quote">
										«Наш чат-бот для абитуриентов уже обработал 1000+ вопросов и снизил нагрузку на
										приёмную комиссию».
									</p>
									<p className="story-card__meta">Имя, факультет</p>
								</div>
							</motion.article>
						</div>
					</motion.div>
				</div>

				<motion.div
					className="stories__cta"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<a
						className="stories__button stories__button--primary"
						href="#form"
					>
						Хочу так же! Расскажите, как начать
					</a>
					<a
						className="stories__button stories__button--secondary"
						href="#projects"
					>
						Посмотреть все проекты
					</a>
				</motion.div>
			</div>
		</section>
	)
}

export default SectionTwo
