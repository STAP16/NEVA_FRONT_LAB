import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './HowItWorks.css'

const stages = [
	{
		number: '01',
		title: 'Отбор и формирование команды',
		description: 'Заполняешь заявку, проходишь короткое интервью. Мы подбираем команду из 3–5 человек под задачу и уровень каждого участника.',
		detail: 'Старт нового потока — каждый месяц'
	},
	{
		number: '02',
		title: 'Планирование спринта',
		description: 'Вместе с ментором определяете цели, разбиваете задачи и составляете план на 2 недели. Как в реальной IT-команде.',
		detail: 'Спринт = 2 недели, демо каждые 14 дней'
	},
	{
		number: '03',
		title: 'Работа + менторский фидбек',
		description: 'Команда работает по задачам. Ментор даёт фидбек, помогает разблокировать тупики. AI-инструменты ускоряют рутину, но не заменяют тебя.',
		detail: 'AI помогает, но решения принимаешь ты'
	},
	{
		number: '04',
		title: 'Презентация и релиз',
		description: 'Собираешь результат, готовишь демо и защищаешь проект перед командой и экспертами. Кейс уходит в твоё портфолио.',
		detail: 'Длительность проекта: 2–3 месяца'
	}
]

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

function StageCard({ stage, index }) {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-80px' })

	return (
		<motion.div
			ref={ref}
			className="how__stage"
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={fadeUp}
			transition={{ delay: index * 0.15 }}
		>
			<div className="how__stage-number">{stage.number}</div>
			<div className="how__stage-body">
				<h3 className="how__stage-title">{stage.title}</h3>
				<p className="how__stage-desc">{stage.description}</p>
				<span className="how__stage-detail">{stage.detail}</span>
			</div>
		</motion.div>
	)
}

export function HowItWorks() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section className="how" id="how-it-works">
			<div className="how__container" ref={ref}>
				<motion.div
					className="how__header"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
				>
					<h2 className="how__title">
						Как устроена работа в NEVA LAB
					</h2>
					<p className="how__subtitle">
						Мы заменили хаос на процесс из digital-индустрии.
						Каждый проект проходит через 4 этапа — от формирования команды
						до защиты результата.
					</p>
				</motion.div>

				<div className="how__stages">
					<div className="how__timeline-line" />
					{stages.map((stage, i) => (
						<StageCard key={stage.number} stage={stage} index={i} />
					))}
				</div>
			</div>
		</section>
	)
}
