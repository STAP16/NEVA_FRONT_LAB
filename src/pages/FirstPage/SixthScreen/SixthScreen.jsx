import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RouteNavLink } from '../../../components/navigation'
import './SixthScreen.css'

/*
 * Координаты узлов вдоль SVG-кривой (viewBox 900×200):
 *   Path: M 50,170 → C...230,130 → C...410,90 → C...590,55 → C...720,30 → C...850,10
 *   Каждый узел позиционируется абсолютно через left% и top%
 *   left = X / 900 * 100,  top = Y / 200 * 100   (центр круга на линии)
 */
const blue = '#2c5aa0'

const icons = {
	target: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<circle cx="12" cy="12" r="10" stroke={blue} strokeWidth="2" />
			<circle cx="12" cy="12" r="6" stroke={blue} strokeWidth="2" />
			<circle cx="12" cy="12" r="2" fill={blue} />
		</svg>
	),
	team: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<circle cx="9" cy="7" r="3" stroke={blue} strokeWidth="1.8" />
			<circle cx="16" cy="7" r="3" stroke={blue} strokeWidth="1.8" />
			<path d="M2 20c0-3.3 2.7-6 6-6h1c3.3 0 6 2.7 6 6" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
			<path d="M16 14c2.8 0 5 2.2 5 5v1" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	),
	briefcase: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<rect x="2" y="7" width="20" height="13" rx="2" stroke={blue} strokeWidth="2" />
			<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke={blue} strokeWidth="2" />
			<path d="M12 12v2" stroke={blue} strokeWidth="2" strokeLinecap="round" />
			<path d="M2 12h20" stroke={blue} strokeWidth="2" />
		</svg>
	),
	rocket: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M12 2c-1 4-4 8-7 10l2 2 2-1c0 3 1 5 3 7 2-2 3-4 3-7l2 1 2-2c-3-2-6-6-7-10z" stroke={blue} strokeWidth="1.8" strokeLinejoin="round" />
			<circle cx="12" cy="11" r="2" fill={blue} />
			<path d="M5 19l2-2" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
			<path d="M7 21l2-2" stroke={blue} strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	),
	star: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.8 3 1.1-6.5L2.6 8.8l6.5-.9L12 2z" fill="#f0c930" stroke="#d4a917" strokeWidth="1.2" strokeLinejoin="round" />
		</svg>
	)
}

const stages = [
	{
		id: 1,
		title: 'Новичок',
		text: 'Осваиваешь базу, учишься работать в системе, понимаешь как устроен проект.',
		icon: icons.target,
		x: 5.5, // 50/900
		y: 70 // 170/200
	},
	{
		id: 2,
		title: 'Команда',
		text: 'Учишься взаимодействовать, соблюдать процессы и отвечать за свой результат.',
		icon: icons.team,
		x: 25.5, // 230/900
		y: 45 // 130/200
	},
	{
		id: 3,
		title: 'Исполнитель',
		text: 'Самостоятельно закрываешь задачи, формируешь портфолио и нарабатываешь экспертизу.',
		icon: icons.briefcase,
		x: 45.5, // 410/900
		y: 28 // 90/200
	},
	{
		id: 4,
		title: 'Лид',
		text: 'Берёшь ответственность за результат команды, принимаешь решения и управляешь процессами.',
		icon: icons.rocket,
		x: 65.5, // 590/900
		y: 14.5 // 55/200
	},
	{
		id: 5,
		title: 'Наставник',
		text: 'Обладаешь достаточной глубиной знаний, чтобы запускать собственные проекты, обучать других и формировать стандарты внутри лаборатории.',
		icon: icons.star,
		x: 87.4, // 850/900
		y: 0 // 10/200
	}
]

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

const nodeVariant = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: i => ({
		opacity: 1,
		scale: 1,
		transition: { duration: 0.4, delay: 0.5 + i * 0.2 }
	})
}

export function SixthScreen() {
	const sectionRef = useRef(null)
	const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

	return (
		<section
			ref={sectionRef}
			className="lab-path"
			id="lab-path-bridge"
		>
			<div className="lab-path__glow" />
			<div className="lab-path__grid-lines" />

			<motion.div
				className="lab-path__container"
				variants={stagger}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
			>
				{/* Текстовый блок */}
				<motion.div
					className="lab-path__text"
					variants={fadeUp}
				>
					<h2 className="lab-path__title">Твой путь в лаборатории</h2>
					<p className="lab-path__subtitle">От первого проекта до роли наставника</p>
					<p className="lab-path__micro">Посмотри, как это устроено внутри</p>
				</motion.div>

				{/* Таймлайн */}
				<motion.div
					className="lab-path__timeline"
					variants={fadeUp}
				>
					{/* SVG линия пути */}
					<svg
						className="lab-path__line-svg"
						viewBox="0 0 900 200"
						preserveAspectRatio="none"
						fill="none"
					>
						<defs>
							<linearGradient
								id="pathGrad"
								x1="0%"
								y1="0%"
								x2="100%"
								y2="0%"
							>
								<stop
									offset="0%"
									stopColor="#2c5aa0"
								/>
								<stop
									offset="100%"
									stopColor="#4a7fd4"
								/>
							</linearGradient>
						</defs>
						<motion.path
							d="M 50 170 C 150 170, 180 140, 230 130 C 280 120, 330 100, 410 90 C 490 80, 530 60, 590 55 C 650 50, 680 35, 720 30 C 760 25, 810 15, 850 10"
							stroke="url(#pathGrad)"
							strokeWidth="2.5"
							strokeLinecap="round"
							fill="none"
							initial={{ pathLength: 0 }}
							animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
							transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
						/>
					</svg>

					{/* Узлы — абсолютно позиционированы вдоль кривой */}
					<div className="lab-path__nodes">
						{stages.map((stage, i) => (
							<motion.div
								key={stage.id}
								className={`lab-path__node lab-path__node--${stage.id} ${i === stages.length - 1 ? 'lab-path__node--final' : ''}`}
								style={{
									'--node-left': `${stage.x}%`,
									'--node-top': `${stage.y}%`
								}}
								custom={i}
								variants={nodeVariant}
								initial="hidden"
								animate={isInView ? 'visible' : 'hidden'}
							>
								<div className="lab-path__circle">
									<span className="lab-path__circle-icon">{stage.icon}</span>
								</div>
								<div className="lab-path__card">
									<h4 className="lab-path__card-title">{stage.title}</h4>
									<p className="lab-path__card-text">{stage.text}</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Trust + CTA */}
				<motion.div
					className="lab-path__bottom"
					variants={fadeUp}
				>
					<p className="lab-path__trust">
						Большинство участников проходит этот путь за 6–12 месяцев
					</p>
					<RouteNavLink
						to="/about"
						className="lab-path__cta"
					>
						Посмотреть, как устроена лаборатория →
					</RouteNavLink>
				</motion.div>
			</motion.div>
		</section>
	)
}
