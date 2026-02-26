import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import teamLeadImg from '../../../assets/NEVA_LAB_TEAM_LEAD.webp'
import designerAvatar from '../../../assets/Designer_avatar.jpg'
import './TeamScreen.css'

const mentors = [
	{
		role: 'Веб-разработка',
		description:
			'Практикующие разработчики. Помогают освоить стек, код-ревью и продуктовые практики.',
		icon: '💻'
	},
	{
		role: 'Разработка чат-ботов',
		description: 'Реализация продвинутых чат-ботов с интеграцией ИИ.',
		icon: '🤖'
	},
	{
		role: 'AI-системы',
		description:
			'Освоение AI-систем и применение их для закрытия большого спектра задач.',
		icon: '🧠'
	},
	{
		role: 'UI/UX Дизайн',
		name: 'Максим Панкрушев',
		avatar: 'designer',
		description:
			'Дизайнеры с опытом запуска продуктов. Учат проектировать интерфейсы, которые решают задачи пользователя.',
		icon: '🎨'
	}
]

const roles = [
	{ name: 'PM', label: 'Управление проектом' },
	{ name: 'Dev', label: 'Разработка' },
	{ name: 'Design', label: 'Дизайн' },
	{ name: 'AI', label: 'Искусственный интеллект' },
	{ name: 'QA', label: 'Тестирование' }
]

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function TeamScreen() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<section
			className="team"
			id="team"
		>
			<div
				className="team__container"
				ref={ref}
			>
				<motion.div
					className="team__header"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
				>
					<h2 className="team__title">Кто ведёт лабораторию</h2>
					<p className="team__subtitle">
						Практикующие специалисты с опытом коммерческих проектов. Не теоретики из учебников —
						люди, которые запускали продукты и знают, как работают настоящие команды.
					</p>
				</motion.div>

				{/* Руководитель */}
				<motion.div
					className="team__lead"
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
					variants={fadeUp}
					transition={{ delay: 0.2 }}
				>
					<div className="team__lead-avatar">
						<img
							className="team__lead-avatar-img"
							src={teamLeadImg}
							alt="Котоман Степан"
						loading="lazy"
						/>
					</div>
					<div className="team__lead-info">
						<h3 className="team__lead-name">Руководитель лаборатории</h3>
						<p className="team__lead-FIO">Котоман Степан</p>
						<p className="team__lead-role">
							Координация направлений, связь с партнёрами, стратегия развития
						</p>
						<div className="team__lead-stats">
							<span className="team__lead-stat">Участие в запуске продуктов</span>
							<span className="team__lead-stat">Опыт управления командами</span>
							<span className="team__lead-stat">Fullstack разработка</span>
							<span className="team__lead-stat">Оркестрирование AI агентами</span>
							<span className="team__lead-stat">Опыт публичных выступлений 400+ человек</span>
						</div>
					</div>
				</motion.div>

				{/* Менторы */}
				<div className="team__mentors">
					{mentors.map((mentor, i) => (
						<motion.div
							className="team__mentor"
							key={mentor.role}
							initial="hidden"
							animate={isInView ? 'visible' : 'hidden'}
							variants={fadeUp}
							transition={{ delay: 0.3 + i * 0.1 }}
						>
							{mentor.avatar === 'designer' ? (
								<div className="team__mentor-avatar">
									<img
										className="team__mentor-avatar-img"
										src={designerAvatar}
										alt={mentor.name}
									loading="lazy"
									/>
								</div>
							) : (
								<span className="team__mentor-icon">{mentor.icon}</span>
							)}
							<h4 className="team__mentor-role">{mentor.role}</h4>
							{mentor.name && <p className="team__mentor-name">{mentor.name}</p>}
							<p className="team__mentor-desc">{mentor.description}</p>
						</motion.div>
					))}
				</div>

				{/* Роли в проекте */}
				<motion.div
					className="team__roles-block"
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
					variants={fadeUp}
					transition={{ delay: 0.7 }}
				>
					<h3 className="team__roles-title">Роли участников в каждом проекте</h3>
					<div className="team__roles">
						{roles.map(role => (
							<div
								className="team__role"
								key={role.name}
							>
								<span className="team__role-name">{role.name}</span>
								<span className="team__role-label">{role.label}</span>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
