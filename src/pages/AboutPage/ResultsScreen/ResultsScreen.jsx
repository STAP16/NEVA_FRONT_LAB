import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import nevikImg from '../../../assets/NEVIK_WHAT_YOU_GET.png'
import './ResultsScreen.css'

const results = [
	{
		number: 1,
		level: 'Навык',
		items: [
			'Опыт спринтов и дедлайнов',
			'Работа с реальными задачами клиента',
			'Понимание продуктового цикла от идеи до релиза'
		]
	},
	{
		number: 2,
		level: 'Портфолио',
		items: [
			'Реальный кейс с описанием и результатом',
			'Рабочая демо-версия продукта',
			'Публичная презентация перед экспертами'
		]
	},
	{
		number: 3,
		level: 'Карьера',
		items: [
			'Уверенность на собеседовании',
			'Понимание ролей и процессов в IT-команде',
			'Осознание своей специализации и сильных сторон'
		]
	}
]

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export function ResultsScreen() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section className="results" id="results">
			<div className="results__container" ref={ref}>
				<motion.div
					className="results__header"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
				>
					<h2 className="results__title">Что получают участники</h2>
					<p className="results__subtitle">
						Не абстрактные «знания» — а конкретный результат на каждом уровне:
						навык, портфолио, карьерное преимущество.
					</p>
				</motion.div>

				<div className="results__cards-wrapper">
					<motion.img
						className="results__nevik"
						src={nevikImg}
						alt="Nevik"
						initial={{ opacity: 0, x: -40 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.2 }}
					/>
					{results.map((result, i) => (
						<motion.div
							className={`results__card results__card--${i + 1}`}
							key={result.level}
							initial="hidden"
							animate={isInView ? 'visible' : 'hidden'}
							variants={fadeUp}
							transition={{ delay: 0.3 + i * 0.2 }}
						>
							<div className="results__card-inner">
								{/* Номер-круг */}
								<div className="results__number-circle">
									<span className="results__number">{result.number}</span>
								</div>

								{/* Заголовок карточки */}
								<h3 className="results__card-title">{result.level}</h3>

								{/* Список пунктов */}
								<ul className="results__card-list">
									{result.items.map((item, j) => (
										<li className="results__card-item" key={j}>
											<svg
												className="results__check-icon"
												width="18"
												height="18"
												viewBox="0 0 18 18"
												fill="none"
											>
												<circle cx="9" cy="9" r="9" fill="rgba(44, 90, 160, 0.1)" />
												<path
													d="M5.5 9.5L7.5 11.5L12.5 6.5"
													stroke="#2c5aa0"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<span className="results__card-text">{item}</span>
										</li>
									))}
								</ul>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
