import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './ResultsScreen.css'

const results = [
	{
		level: 'Навык',
		color: '#2c5aa0',
		items: [
			'Опыт спринтов и дедлайнов',
			'Работа с реальными задачами клиента',
			'Понимание продуктового цикла от идеи до релиза'
		]
	},
	{
		level: 'Портфолио',
		color: '#4a7fd4',
		items: [
			'Реальный кейс с описанием и результатом',
			'Рабочая демо-версия продукта',
			'Публичная презентация перед экспертами'
		]
	},
	{
		level: 'Карьера',
		color: '#1e3a6e',
		items: [
			'Уверенность на собеседовании',
			'Понимание ролей и процессов в IT-команде',
			'Осознание своей специализации и сильных сторон'
		]
	}
]

const stats = [
	{ number: '15+', label: 'запущенных проектов' },
	{ number: '100+', label: 'участников прошли лабораторию' },
	{ number: '2500+', label: 'часов менторской поддержки' },
	{ number: '92%', label: 'отмечают влияние на карьеру' }
]

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

				{/* 3 уровня результатов */}
				<div className="results__levels">
					{results.map((result, i) => (
						<motion.div
							className="results__level"
							key={result.level}
							initial="hidden"
							animate={isInView ? 'visible' : 'hidden'}
							variants={fadeUp}
							transition={{ delay: 0.2 + i * 0.15 }}
						>
							<div
								className="results__level-badge"
								style={{ background: result.color }}
							>
								{result.level}
							</div>
							<ul className="results__level-list">
								{result.items.map((item, j) => (
									<li className="results__level-item" key={j}>
										<span className="results__check">✓</span>
										{item}
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				{/* Блок цифр */}
				<motion.div
					className="results__stats"
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
					variants={fadeUp}
					transition={{ delay: 0.7 }}
				>
					{stats.map((stat) => (
						<div className="results__stat" key={stat.label}>
							<span className="results__stat-number">{stat.number}</span>
							<span className="results__stat-label">{stat.label}</span>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
