import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import forWhomImg from '../../../assets/NEVA_FORWHOM.png'
import './ForWhomScreen.css'

const fits = [
	'Хочешь реальный опыт, а не теорию ради теории',
	'Готов работать в команде и слышать честный  фидбек',
	'Готов брать ответственность за свой кусок работы',
	'Хочешь кейс в портфолио ещё до выпуска'
]

const notFits = [
	'Хочешь «просто посмотреть видео» без практики',
	'Не готов к дедлайнам и ответственности',
	'Ищешь лёгкий сертификат для галочки',
	'Ждёшь, что всё сделают за тебя'
]

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function ForWhomScreen() {
	const ref = useRef(null)
	const sectionRef = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'start']
	})

	const mascotY = useTransform(scrollYProgress, [0, 0.8], [500, 0])
	const mascotOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
	const cardsOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.9])
	const cardsY = useTransform(scrollYProgress, [0.5, 1], [50, 0])

	return (
		<section
			className="for-whom"
			id="for-whom"
			ref={sectionRef}
		>
			<motion.img
				className="for-whom__mascot"
				src={forWhomImg}
				alt="Nevik"
				style={{ opacity: mascotOpacity, y: mascotY }}
			/>

			<motion.div
				className="for-whom__container"
				ref={ref}
				style={{ opacity: cardsOpacity, y: cardsY }}
			>
				<motion.div
					className="for-whom__header"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
				>
					<h2 className="for-whom__title">Кому подходит NEVA LAB</h2>
					<p className="for-whom__subtitle">
						Мы не для всех — и это сознательный выбор. Лаборатория работает, когда в неё приходят
						те, кто готов действовать.
					</p>
				</motion.div>

				<div className="for-whom__columns">
					{/* Подходит */}
					<motion.div
						className="for-whom__column for-whom__column--yes"
						initial="hidden"
						animate={isInView ? 'visible' : 'hidden'}
						variants={fadeUp}
						transition={{ delay: 0.2 }}
					>
						<div className="for-whom__column-header for-whom__column-header--yes">
							<span className="for-whom__column-icon">✓</span>
							<h3 className="for-whom__column-title">Подходит, если</h3>
						</div>
						<ul className="for-whom__list">
							{fits.map((item, i) => (
								<li
									className="for-whom__item for-whom__item--yes"
									key={i}
								>
									<span className="for-whom__item-mark for-whom__item-mark--yes">+</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</motion.div>

					{/* Не подходит */}
					<motion.div
						className="for-whom__column for-whom__column--no"
						initial="hidden"
						animate={isInView ? 'visible' : 'hidden'}
						variants={fadeUp}
						transition={{ delay: 0.35 }}
					>
						<div className="for-whom__column-header for-whom__column-header--no">
							<span className="for-whom__column-icon">✕</span>
							<h3 className="for-whom__column-title">Не подойдёт, если</h3>
						</div>
						<ul className="for-whom__list">
							{notFits.map((item, i) => (
								<li
									className="for-whom__item for-whom__item--no"
									key={i}
								>
									<span className="for-whom__item-mark for-whom__item-mark--no">−</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</motion.div>
				</div>
			</motion.div>
		</section>
	)
}
