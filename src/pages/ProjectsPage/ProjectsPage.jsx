import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './ProjectsPage.css'
import codeIcon from '../../assets/code.svg'
import aiIcon from '../../assets/ai_robot.svg'
import caseIcon from '../../assets/case.svg'
import rocketIcon from '../../assets/rocket.svg'
import coursesIcon from '../../assets/courses.svg'

const projects = [
	{
		id: 'edu-track',
		title: 'Учебный трек',
		category: 'Web',
		categoryKey: 'web',
		description:
			'Платформа для персональных траекторий обучения: задания по уровням, прогресс в реальном времени и дашборд для менторов.',
		stage: 'Спринт 3/5',
		progress: 62,
		participants: 14,
		mentors: ['Анна К.', 'Михаил Н.'],
		deadline: 'Март 2026',
		seats: 4
	},
	{
		id: 'city-assist',
		title: 'Городской ассистент',
		category: 'AI',
		categoryKey: 'ai',
		description:
			'AI-сервис для студентов и горожан: маршруты, ответы на частые вопросы и быстрый доступ к городским и кампусным сервисам.',
		stage: 'Спринт 2/4',
		progress: 48,
		participants: 11,
		mentors: ['Даниил Р.', 'Софья Л.'],
		deadline: 'Апрель 2026',
		seats: 3
	},
	{
		id: 'campus-flow',
		title: 'Поток кампуса',
		category: 'Mobile',
		categoryKey: 'mobile',
		description:
			'Мобильное приложение для расписания, событий и командной работы. Фокус на ежедневных сценариях студентов и push-напоминаниях.',
		stage: 'Финальная сборка',
		progress: 87,
		participants: 9,
		mentors: ['Егор М.'],
		deadline: 'Февраль 2026',
		seats: 2
	},
	{
		id: 'lab-kit-ui',
		title: 'UI-набор лаборатории',
		category: 'Design',
		categoryKey: 'design',
		description:
			'Единая дизайн-система для проектов NEVA LAB: компоненты, токены и гайды, чтобы быстрее запускать интерфейсы без потери качества.',
		stage: 'Спринт 1/3',
		progress: 31,
		participants: 7,
		mentors: ['Вероника С.', 'Илья П.'],
		deadline: 'Май 2026',
		seats: 5
	},
	{
		id: 'mentor-bot',
		title: 'Бот-ментор',
		category: 'AI',
		categoryKey: 'ai',
		description:
			'Ассистент для команд: подсказывает следующий шаг в спринте, собирает фидбек после демо и помогает не терять темп разработки.',
		stage: 'Спринт 4/5',
		progress: 79,
		participants: 16,
		mentors: ['Артем В.', 'Ольга Д.'],
		deadline: 'Март 2026',
		seats: 1
	},
	{
		id: 'market-pulse',
		title: 'Пульс рынка',
		category: 'Analytics',
		categoryKey: 'analytics',
		description:
			'Аналитический проект для проверки гипотез: сбор продуктовых метрик, визуализация динамики и рекомендации по приоритетам бэклога.',
		stage: 'Спринт 2/6',
		progress: 39,
		participants: 12,
		mentors: ['Роман Г.'],
		deadline: 'Июнь 2026',
		seats: 3
	}
]

const categories = [
	{ key: 'all', label: 'Все' },
	{ key: 'web', label: 'Web' },
	{ key: 'mobile', label: 'Mobile' },
	{ key: 'ai', label: 'AI' },
	{ key: 'design', label: 'Design' },
	{ key: 'analytics', label: 'Analytics' }
]
const validCategoryKeys = new Set(categories.map(category => category.key))

const categoryIcons = {
	web: codeIcon,
	mobile: coursesIcon,
	ai: aiIcon,
	design: caseIcon,
	analytics: rocketIcon
}

export function ProjectsPage() {
	const [selectedCategoryKey, setSelectedCategoryKey] = useState('all')
	const [expandedProjectIds, setExpandedProjectIds] = useState([])
	const safeCategoryKey = validCategoryKeys.has(selectedCategoryKey) ? selectedCategoryKey : 'all'
	const toggleProjectDescription = projectId => {
		setExpandedProjectIds(currentIds =>
			currentIds.includes(projectId)
				? currentIds.filter(id => id !== projectId)
				: [...currentIds, projectId]
		)
	}

	const filteredProjects = useMemo(() => {
		if (safeCategoryKey === 'all') {
			return projects
		}
		return projects.filter(project => project.categoryKey === safeCategoryKey)
	}, [safeCategoryKey])

	return (
		<main className="projects-page">
			<section className="projects-hero">
				<div className="projects-hero__inner">
					<p className="projects-hero__label">NEVA PROJECT HUB</p>
					<h1 className="projects-hero__title">Проекты в реальном времени</h1>
					<p className="projects-hero__subtitle">
						Выбирай проект по направлению, подключайся к команде и набирай
						опыт в реальной продуктовой разработке с поддержкой менторов.
					</p>
				</div>
			</section>

			<section className="projects-board">
				<div className="projects-board__toolbar">
					<div className="projects-board__chips" role="tablist" aria-label="Фильтр направлений">
						{categories.map(category => (
							<button
								key={category.key}
								type="button"
								role="tab"
								aria-selected={safeCategoryKey === category.key}
								className={`projects-chip${safeCategoryKey === category.key ? ' projects-chip--active' : ''}`}
								onClick={() => setSelectedCategoryKey(category.key)}
							>
								{category.label}
							</button>
						))}
					</div>

					<label className="projects-board__select-wrap">
						<span className="projects-board__select-label">Направление</span>
						<select
							className="projects-board__select"
							value={safeCategoryKey}
							onChange={event => setSelectedCategoryKey(event.target.value)}
						>
							{categories.map(category => (
								<option key={category.key} value={category.key}>
									{category.label}
								</option>
							))}
						</select>
					</label>
				</div>

				<div className="projects-grid">
					{filteredProjects.map(project => {
						const isDescriptionExpanded = expandedProjectIds.includes(project.id)
						const descriptionId = `project-description-${project.id}`

						return (
							<motion.article
								key={project.id}
								className="project-card"
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35, ease: 'easeOut' }}
							>
								<header className="project-card__header">
								<div className="project-card__badge">
									<img src={categoryIcons[project.categoryKey]} alt="" aria-hidden="true" />
									<span>{project.category}</span>
								</div>
								<span className="project-card__deadline">{project.deadline}</span>
								</header>

								<h2 className="project-card__title">{project.title}</h2>
								<p className="project-card__stage">{project.stage}</p>

								<div className="project-card__progress" aria-label={`Прогресс ${project.progress}%`}>
									<div
										className="project-card__progress-fill"
										style={{ width: `${project.progress}%` }}
									/>
								</div>

								<div className="project-card__meta">
									<p>
										<span>Участники</span>
										<strong>{project.participants}</strong>
									</p>
									<p>
										<span>Свободных мест</span>
										<strong>{project.seats}</strong>
									</p>
								</div>

								<div className="project-card__mentors">
									<span>Менторы:</span>
									<ul>
										{project.mentors.map(mentor => (
											<li key={mentor}>{mentor}</li>
										))}
									</ul>
								</div>

								<button
									type="button"
									className="project-card__details-toggle"
									aria-expanded={isDescriptionExpanded}
									aria-controls={descriptionId}
									onClick={() => toggleProjectDescription(project.id)}
								>
									{isDescriptionExpanded ? 'Скрыть описание' : 'Показать описание'}
								</button>

								<AnimatePresence initial={false}>
									{isDescriptionExpanded && (
										<motion.p
											id={descriptionId}
											className="project-card__description"
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: 'auto' }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.22, ease: 'easeOut' }}
										>
											{project.description}
										</motion.p>
									)}
								</AnimatePresence>

								<button type="button" className="project-card__cta">
									Присоединиться
								</button>
							</motion.article>
						)
					})}
				</div>
			</section>
		</main>
	)
}
