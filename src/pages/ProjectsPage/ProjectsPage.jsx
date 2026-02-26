import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './ProjectsPage.css'
import { PROJECTS } from '../../data/projects'
import codeIcon from '../../assets/code.svg'
import aiIcon from '../../assets/ai_robot.svg'
import caseIcon from '../../assets/case.svg'
import rocketIcon from '../../assets/rocket.svg'
import coursesIcon from '../../assets/courses.svg'

const FALLBACK_PROJECTS = PROJECTS

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

const stagger = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.17, delayChildren: 0.03 }
	}
}
const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] }
	}
}
const fadeUpSoft = {
	hidden: { opacity: 0, y: 8 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] }
	}
}
const chipsStagger = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.07, delayChildren: 0.08 }
	}
}
const cardsStagger = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.08, delayChildren: 0.12 }
	}
}

export function ProjectsPage() {
	const navigate = useNavigate()
	const [projects] = useState(FALLBACK_PROJECTS)
	const [selectedCategoryKey, setSelectedCategoryKey] = useState('all')
	const [activeProjectId, setActiveProjectId] = useState(null)

	const safeCategoryKey = validCategoryKeys.has(selectedCategoryKey) ? selectedCategoryKey : 'all'
	const filteredProjects = useMemo(() => {
		if (safeCategoryKey === 'all') {
			return projects
		}
		return projects.filter(project => project.categoryKey === safeCategoryKey)
	}, [safeCategoryKey, projects])

	const activeProject = useMemo(
		() => projects.find(project => project.id === activeProjectId) ?? null,
		[activeProjectId, projects]
	)

	useEffect(() => {
		if (!activeProject) {
			return undefined
		}

		const handleEscape = event => {
			if (event.key === 'Escape') {
				setActiveProjectId(null)
			}
		}

		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', handleEscape)

		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', handleEscape)
		}
	}, [activeProject])

	const openProjectModal = projectId => {
		setActiveProjectId(projectId)
	}

	const closeProjectModal = () => {
		setActiveProjectId(null)
	}

	const handleJoin = useCallback(project => {
		if (project.seats < 1) {
			return
		}
		navigate('/contacts?mode=project&project=' + encodeURIComponent(project.title))
	}, [navigate])

	return (
		<main className="projects-page">
			<section className="projects-hero">
				<motion.div className="projects-hero__inner" variants={stagger} initial="hidden" animate="visible">
					<motion.p className="projects-hero__label" variants={fadeUp}>NEVA PROJECT HUB</motion.p>
					<motion.h1 className="projects-hero__title" variants={fadeUp}>Проекты</motion.h1>
					<motion.p className="projects-hero__subtitle" variants={fadeUp}>
						Выбирай проект по направлению, подключайся к команде и набирай
						опыт в реальной продуктовой разработке с поддержкой менторов.
					</motion.p>
				</motion.div>
			</section>

			<section className="projects-board">
				<motion.div className="projects-board__toolbar" variants={stagger} initial="hidden" animate="visible">
					<motion.div className="projects-board__chips" role="tablist" aria-label="Фильтр направлений" variants={chipsStagger}>
						{categories.map(category => (
							<motion.button
								key={category.key}
								type="button"
								role="tab"
								aria-selected={safeCategoryKey === category.key}
								className={`projects-chip${safeCategoryKey === category.key ? ' projects-chip--active' : ''}`}
								onClick={() => setSelectedCategoryKey(category.key)}
								variants={fadeUpSoft}
							>
								{category.label}
							</motion.button>
						))}
					</motion.div>
				</motion.div>

				<motion.div
					key={`${safeCategoryKey}-${projects.length}`}
					className="projects-grid"
					variants={cardsStagger}
					initial="hidden"
					animate="visible"
				>
					{filteredProjects.map(project => (
						<motion.article
							key={project.id}
							className="project-card"
							variants={fadeUpSoft}
						>
							<header className="project-card__header">
								<div className="project-card__badge">
									<img src={categoryIcons[project.categoryKey]} alt="" aria-hidden="true" />
									<span>{project.category}</span>
								</div>
								<span className="project-card__deadline">{project.deadline}</span>
							</header>

							<h2 className="project-card__title">{project.title}</h2>

							<div className="project-card__progress" aria-label={`Прогресс ${project.progress}%`}>
								<div className="project-card__progress-fill" style={{ width: `${project.progress}%` }} />
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

							<p className="project-card__summary">{project.description}</p>

							<div className="project-card__actions">
								<button type="button" className="project-card__details-toggle" onClick={() => openProjectModal(project.id)}>
									Подробнее
								</button>
								<button
									type="button"
									className={`project-card__cta${project.seats < 1 ? ' project-card__cta--disabled' : ''}`}
									onClick={() => handleJoin(project)}
									disabled={project.seats < 1}
								>
									Присоединиться
								</button>
							</div>
						</motion.article>
					))}
					{filteredProjects.length === 0 && (
						<p className="projects-grid__empty">По этому фильтру пока нет проектов.</p>
					)}
				</motion.div>
			</section>

			<AnimatePresence>
				{activeProject && (
					<motion.div
						className="project-modal"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={event => {
							if (event.target === event.currentTarget) {
								closeProjectModal()
							}
						}}
					>
						<motion.section
							className="project-modal__panel"
							role="dialog"
							aria-modal="true"
							aria-labelledby={`project-modal-title-${activeProject.id}`}
							initial={{ opacity: 0, y: 24, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 14, scale: 0.98 }}
							transition={{ duration: 0.22, ease: 'easeOut' }}
						>
							<button type="button" className="project-modal__close" onClick={closeProjectModal} aria-label="Закрыть">
								×
							</button>

							<header className="project-modal__header">
								<h2 id={`project-modal-title-${activeProject.id}`} className="project-modal__title">
									{activeProject.title}
								</h2>
								<div className="project-modal__base-info">
									<img
										className="project-modal__project-icon"
										src={categoryIcons[activeProject.categoryKey]}
										alt={`Иконка проекта ${activeProject.title}`}
									/>
									<p>{activeProject.category}</p>
								</div>
							</header>

							<section className="project-modal__section">
								<h3>Описание</h3>
								<p className="project-modal__description">{activeProject.description}</p>
							</section>

							<section className="project-modal__section">
								<h3>Прогресс</h3>
								<div className="project-modal__progress-bar">
									<div className="project-modal__progress-bar-fill" style={{ width: `${activeProject.progress}%` }} />
								</div>
								<span className="project-modal__progress-label">{activeProject.progress}% завершено</span>
							</section>

							<section className="project-modal__section">
								<h3>Информация</h3>
								<div className="project-modal__info-grid">
									<div className="project-modal__info-item">
										<span>Ментор</span>
										<strong>{activeProject.mentor || '—'}</strong>
									</div>
									<div className="project-modal__info-item">
										<span>Участники</span>
										<strong>{activeProject.participants}</strong>
									</div>
									<div className="project-modal__info-item">
										<span>Свободных мест</span>
										<strong>{activeProject.seats}</strong>
									</div>
									<div className="project-modal__info-item">
										<span>Дата окончания</span>
										<strong>{activeProject.deadline}</strong>
									</div>
									{activeProject.recruitmentDate && (
										<div className="project-modal__info-item">
											<span>Дата набора</span>
											<strong>{activeProject.recruitmentDate}</strong>
										</div>
									)}
									<div className="project-modal__info-item">
										<span>Статус</span>
										<strong>{activeProject.status === 'active' ? 'Активный' : 'Завершён'}</strong>
									</div>
								</div>
							</section>

							<footer className="project-modal__footer">
								<button
									type="button"
									className={`project-modal__primary-action${
										activeProject.status === 'active' && activeProject.seats < 1 ? ' project-modal__primary-action--disabled' : ''
									}`}
									onClick={() => handleJoin(activeProject)}
								>
									Присоединиться
								</button>
							</footer>
						</motion.section>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	)
}
