import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import './ProjectsPage.css'
import { fetchProjects, submitProjectFeedback, joinProject } from '../../api/projects.js'
import codeIcon from '../../assets/code.svg'
import aiIcon from '../../assets/ai_robot.svg'
import caseIcon from '../../assets/case.svg'
import rocketIcon from '../../assets/rocket.svg'
import coursesIcon from '../../assets/courses.svg'

const createAvatarDataUri = (name, background) => {
	const initials = name
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map(part => part[0])
		.join('')
		.toUpperCase()

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="${background}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="32" font-family="Arial, sans-serif" font-weight="700">${initials}</text></svg>`
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const createTask = (id, title, timeLabel, owner, resources, stagesDone) => ({
	id,
	title,
	timeLabel,
	owner,
	resources,
	stagesDone
})

// Fallback data used when the API is unavailable.
const FALLBACK_PROJECTS = [
	{
		id: 'edu-track',
		title: 'Учебный трек',
		category: 'Web',
		categoryKey: 'web',
		summary:
			'Платформа для персональных траекторий обучения: задания по уровням, прогресс в реальном времени и дашборд для менторов.',
		stage: 'Спринт 3/5',
		progress: 62,
		progressBreakdown: { done: 48, inProgress: 14, upcoming: 38 },
		participants: 14,
		deadline: 'Март 2026',
		completionDateText: 'Завершается 30 марта 2026 года',
		seats: 4,
		status: 'active',
		resultsUrl: '#results-edu-track',
		joinUrl: '#apply',
		timeline: [
			{ name: 'Исследование', dates: '08 янв - 21 янв', state: 'done' },
			{ name: 'MVP', dates: '22 янв - 18 фев', state: 'progress' },
			{ name: 'Тесты и релиз', dates: '19 фев - 30 мар', state: 'planned' }
		],
		tasks: {
			done: [
				createTask('edu-d-1', 'Собрали карту пользовательских сценариев', 'Завершено 21 янв', 'Анна К.', ['Miro', 'Интервью'], ['Аналитика', 'Приоритизация']),
				createTask('edu-d-2', 'Настроили API авторизации', 'Завершено 30 янв', 'Михаил Н.', ['Node.js', 'JWT'], ['Backend core'])
			],
			inProgress: [
				createTask('edu-p-1', 'Личный кабинет студента', 'Срок 24 фев', 'Илья Р.', ['React', 'Figma'], ['UI кит', 'Маршрутизация']),
				createTask('edu-p-2', 'Дашборд ментора', 'Срок 28 фев', 'Дарья П.', ['Charts', 'SQL'], ['Витрина метрик'])
			],
			upcoming: [
				createTask('edu-u-1', 'Нагрузочное тестирование', 'Старт 3 мар', 'Егор М.', ['k6', 'CI'], ['План тестов']),
				createTask('edu-u-2', 'Публичная демо-защита', 'Старт 25 мар', 'Команда проекта', ['Презентация'], ['Сценарий демо'])
			]
		},
		mentors: [
			{
				name: 'Анна К.',
				specialization: 'Ведущий backend-разработчик',
				role: 'Курирует архитектуру и ревью API',
				avatar: createAvatarDataUri('Анна К.', '#3f6fb3')
			},
			{
				name: 'Михаил Н.',
				specialization: 'Продуктовый дизайнер',
				role: 'Отвечает за UX и валидацию интерфейсов',
				avatar: createAvatarDataUri('Михаил Н.', '#5a88cc')
			}
		],
		members: [
			{
				name: 'Илья Р.',
				role: 'Frontend-разработчик',
				activity: 'Собирает личный кабинет и адаптивные экраны',
				progress: 66,
				history: ['20 фев - интеграция формы входа (80%)', '18 фев - сверстал профиль (100%)'],
				avatar: createAvatarDataUri('Илья Р.', '#4b7ac0')
			},
			{
				name: 'Дарья П.',
				role: 'Data analyst',
				activity: 'Настраивает метрики активности и retention',
				progress: 58,
				history: ['19 фев - витрина событий (70%)', '16 фев - схема трекинга (100%)'],
				avatar: createAvatarDataUri('Дарья П.', '#6a94d2')
			}
		],
		feedback: [
			{ author: 'Анна К.', role: 'Ментор', text: 'Спринт закрыт по плану, команда хорошо держит темп.', time: '17 фев, 18:40' },
			{ author: 'Илья Р.', role: 'Участник', text: 'Нужен дополнительный час на полировку адаптива.', time: '18 фев, 11:20' }
		]
	},
	{
		id: 'city-assist',
		title: 'Городской ассистент',
		category: 'AI',
		categoryKey: 'ai',
		summary:
			'AI-сервис для студентов и горожан: маршруты, ответы на частые вопросы и быстрый доступ к городским и кампусным сервисам.',
		stage: 'Спринт 2/4',
		progress: 48,
		progressBreakdown: { done: 35, inProgress: 13, upcoming: 52 },
		participants: 11,
		deadline: 'Апрель 2026',
		completionDateText: 'Завершается 18 апреля 2026 года',
		seats: 3,
		status: 'active',
		resultsUrl: '#results-city-assist',
		joinUrl: '#apply',
		timeline: [
			{ name: 'Сбор данных', dates: '10 янв - 26 янв', state: 'done' },
			{ name: 'NLP ядро', dates: '27 янв - 01 мар', state: 'progress' },
			{ name: 'Интеграции', dates: '02 мар - 18 апр', state: 'planned' }
		],
		tasks: {
			done: [
				createTask('city-d-1', 'Сформировали базу FAQ', 'Завершено 26 янв', 'Софья Л.', ['Notion', 'CSV'], ['Кластеризация тем']),
				createTask('city-d-2', 'Собрали intent-модель', 'Завершено 08 фев', 'Даниил Р.', ['Python', 'spaCy'], ['Подготовка датасета'])
			],
			inProgress: [
				createTask('city-p-1', 'Точность классификации > 90%', 'Срок 27 фев', 'Глеб В.', ['MLflow'], ['Валидация', 'Тюнинг']),
				createTask('city-p-2', 'Интеграция Telegram-бота', 'Срок 03 мар', 'Софья Л.', ['Telegram API'], ['Webhook'])
			],
			upcoming: [
				createTask('city-u-1', 'Запуск пилота в кампусе', 'Старт 10 мар', 'Команда проекта', ['Google Forms'], ['Сценарий пилота']),
				createTask('city-u-2', 'Итоговая отчетность', 'Старт 12 апр', 'Даниил Р.', ['Slides'], ['Черновик отчета'])
			]
		},
		mentors: [
			{
				name: 'Даниил Р.',
				specialization: 'ML-инженер',
				role: 'Курирует качество модели и архитектуру пайплайна',
				avatar: createAvatarDataUri('Даниил Р.', '#2f5fa5')
			},
			{
				name: 'Софья Л.',
				specialization: 'AI product owner',
				role: 'Отвечает за сценарии использования и запуск пилота',
				avatar: createAvatarDataUri('Софья Л.', '#5a83c8')
			}
		],
		members: [
			{
				name: 'Глеб В.',
				role: 'ML-разработчик',
				activity: 'Дотюнивает классификацию интентов',
				progress: 54,
				history: ['19 фев - precision +4% (60%)', '15 фев - baseline-модель (100%)'],
				avatar: createAvatarDataUri('Глеб В.', '#4d73b6')
			},
			{
				name: 'Надежда С.',
				role: 'Prompt-инженер',
				activity: 'Пишет шаблоны ответов и guardrails',
				progress: 61,
				history: ['20 фев - набор системных промптов (75%)', '17 фев - tone of voice (100%)'],
				avatar: createAvatarDataUri('Надежда С.', '#7ba0db')
			}
		],
		feedback: [
			{ author: 'Софья Л.', role: 'Ментор', text: 'Сценарий пилота согласован, двигаемся к тестам.', time: '18 фев, 10:15' }
		]
	},
	{
		id: 'campus-flow',
		title: 'Поток кампуса',
		category: 'Mobile',
		categoryKey: 'mobile',
		summary:
			'Мобильное приложение для расписания, событий и командной работы. Фокус на ежедневных сценариях студентов и push-напоминаниях.',
		stage: 'Финальная сборка',
		progress: 87,
		progressBreakdown: { done: 74, inProgress: 13, upcoming: 13 },
		participants: 9,
		deadline: 'Февраль 2026',
		completionDateText: 'Завершается 27 февраля 2026 года',
		seats: 2,
		status: 'active',
		resultsUrl: '#results-campus-flow',
		joinUrl: '#apply',
		timeline: [
			{ name: 'Прототип', dates: '05 янв - 19 янв', state: 'done' },
			{ name: 'Основной релиз', dates: '20 янв - 20 фев', state: 'progress' },
			{ name: 'App Store/Play', dates: '21 фев - 27 фев', state: 'planned' }
		],
		tasks: {
			done: [
				createTask('camp-d-1', 'Готова офлайн-лента расписания', 'Завершено 12 фев', 'Егор М.', ['React Native'], ['Кэш', 'Синхронизация']),
				createTask('camp-d-2', 'Подключены push-уведомления', 'Завершено 15 фев', 'Ника К.', ['Firebase'], ['Push сценарии'])
			],
			inProgress: [
				createTask('camp-p-1', 'Финальное тестирование релиза', 'Срок 23 фев', 'QA-группа', ['TestFlight'], ['Smoke tests']),
				createTask('camp-p-2', 'Подготовка store-материалов', 'Срок 24 фев', 'Мария Т.', ['App Store Connect'], ['Тексты карточек'])
			],
			upcoming: [
				createTask('camp-u-1', 'Публикация в сторы', 'Старт 25 фев', 'Егор М.', ['Release checklist'], ['Approval']),
				createTask('camp-u-2', 'Сбор пост-релизного фидбека', 'Старт 28 фев', 'Команда проекта', ['Form'], ['Список метрик'])
			]
		},
		mentors: [
			{
				name: 'Егор М.',
				specialization: 'Мобильная разработка',
				role: 'Ведет релизный контур и QA-процесс',
				avatar: createAvatarDataUri('Егор М.', '#315e9f')
			}
		],
		members: [
			{
				name: 'Мария Т.',
				role: 'Product manager',
				activity: 'Закрывает релизный чеклист',
				progress: 82,
				history: ['20 фев - чеклист 18/22 (82%)', '17 фев - аудит багов (100%)'],
				avatar: createAvatarDataUri('Мария Т.', '#5178b8')
			},
			{
				name: 'Ника К.',
				role: 'Mobile developer',
				activity: 'Шлифует переходы и onboarding',
				progress: 88,
				history: ['19 фев - onboarding flow (90%)', '14 фев - push-модуль (100%)'],
				avatar: createAvatarDataUri('Ника К.', '#6f95cf')
			}
		],
		feedback: [
			{ author: 'Егор М.', role: 'Ментор', text: 'Релиз-кандидат стабилен, осталось закрыть тексты для стора.', time: '20 фев, 09:05' }
		]
	},
	{
		id: 'lab-kit-ui',
		title: 'UI-набор лаборатории',
		category: 'Design',
		categoryKey: 'design',
		summary:
			'Единая дизайн-система для проектов NEVA LAB: компоненты, токены и гайды, чтобы быстрее запускать интерфейсы без потери качества.',
		stage: 'Спринт 1/3',
		progress: 31,
		progressBreakdown: { done: 20, inProgress: 11, upcoming: 69 },
		participants: 7,
		deadline: 'Май 2026',
		completionDateText: 'Завершается 15 мая 2026 года',
		seats: 5,
		status: 'active',
		resultsUrl: '#results-lab-kit-ui',
		joinUrl: '#apply',
		timeline: [
			{ name: 'Базовые токены', dates: '01 фев - 18 фев', state: 'progress' },
			{ name: 'Компоненты', dates: '19 фев - 22 апр', state: 'planned' },
			{ name: 'Гайдлайн', dates: '23 апр - 15 мая', state: 'planned' }
		],
		tasks: {
			done: [createTask('ui-d-1', 'Собран набор цветовых токенов', 'Завершено 12 фев', 'Вероника С.', ['Figma'], ['Color system'])],
			inProgress: [
				createTask('ui-p-1', 'Типографика и сетки', 'Срок 26 фев', 'Илья П.', ['Figma Variables'], ['Desktop scale']),
				createTask('ui-p-2', 'Базовые input-компоненты', 'Срок 01 мар', 'Алиса К.', ['Storybook'], ['States'])
			],
			upcoming: [
				createTask('ui-u-1', 'Документация по компонентам', 'Старт 10 мар', 'Вероника С.', ['Notion'], ['Template']),
				createTask('ui-u-2', 'Внедрение в 3 проекта', 'Старт 12 апр', 'Команда проекта', ['Design QA'], ['Pilot plan'])
			]
		},
		mentors: [
			{
				name: 'Вероника С.',
				specialization: 'Lead UI/UX',
				role: 'Определяет стандарты дизайн-системы',
				avatar: createAvatarDataUri('Вероника С.', '#3a68a8')
			},
			{
				name: 'Илья П.',
				specialization: 'Дизайн-инженер',
				role: 'Синхронизирует токены и фронтенд-компоненты',
				avatar: createAvatarDataUri('Илья П.', '#6289c8')
			}
		],
		members: [
			{
				name: 'Алиса К.',
				role: 'UI дизайнер',
				activity: 'Собирает библиотеку компонентов формы',
				progress: 45,
				history: ['20 фев - states для input (55%)', '18 фев - variants кнопок (100%)'],
				avatar: createAvatarDataUri('Алиса К.', '#4f77b7')
			},
			{
				name: 'Олег Л.',
				role: 'Frontend developer',
				activity: 'Переносит компоненты в Storybook',
				progress: 39,
				history: ['19 фев - token bridge (40%)', '14 фев - base setup (100%)'],
				avatar: createAvatarDataUri('Олег Л.', '#769cd3')
			}
		],
		feedback: [
			{ author: 'Вероника С.', role: 'Ментор', text: 'Для следующего спринта приоритет - документация состояний.', time: '18 фев, 16:55' }
		]
	},
	{
		id: 'mentor-bot',
		title: 'Бот-ментор',
		category: 'AI',
		categoryKey: 'ai',
		summary:
			'Ассистент для команд: подсказывает следующий шаг в спринте, собирает фидбек после демо и помогает не терять темп разработки.',
		stage: 'Спринт 4/5',
		progress: 79,
		progressBreakdown: { done: 63, inProgress: 16, upcoming: 21 },
		participants: 16,
		deadline: 'Март 2026',
		completionDateText: 'Завершается 22 марта 2026 года',
		seats: 1,
		status: 'active',
		resultsUrl: '#results-mentor-bot',
		joinUrl: '#apply',
		timeline: [
			{ name: 'Архитектура агента', dates: '03 янв - 25 янв', state: 'done' },
			{ name: 'Интеграция в трекер', dates: '26 янв - 29 фев', state: 'progress' },
			{ name: 'Релиз и обучение', dates: '01 мар - 22 мар', state: 'planned' }
		],
		tasks: {
			done: [
				createTask('mb-d-1', 'Бот публикует next-step после стендапа', 'Завершено 11 фев', 'Артем В.', ['Slack API'], ['Core loop']),
				createTask('mb-d-2', 'Собран шаблон ретро-фидбека', 'Завершено 15 фев', 'Ольга Д.', ['Prompt templates'], ['Feedback schema'])
			],
			inProgress: [
				createTask('mb-p-1', 'Персональные рекомендации по роли', 'Срок 26 фев', 'Павел А.', ['Role model'], ['Prompt routing'])
			],
			upcoming: [
				createTask('mb-u-1', 'Онбординг для новых команд', 'Старт 03 мар', 'Ольга Д.', ['Guide'], ['Demo scripts'])
			]
		},
		mentors: [
			{
				name: 'Артем В.',
				specialization: 'AI architect',
				role: 'Курирует архитектуру агента и интеграции',
				avatar: createAvatarDataUri('Артем В.', '#325fa3')
			},
			{
				name: 'Ольга Д.',
				specialization: 'Learning designer',
				role: 'Отвечает за сценарии обучения и фидбек',
				avatar: createAvatarDataUri('Ольга Д.', '#5e84c6')
			}
		],
		members: [
			{
				name: 'Павел А.',
				role: 'NLP engineer',
				activity: 'Реализует персонализацию рекомендаций',
				progress: 72,
				history: ['20 фев - роль PM покрыта (80%)', '16 фев - data mapping (100%)'],
				avatar: createAvatarDataUri('Павел А.', '#4d75b8')
			},
			{
				name: 'Елена Ч.',
				role: 'Product analyst',
				activity: 'Собирает метрики вовлеченности',
				progress: 68,
				history: ['19 фев - retention дашборд (70%)', '13 фев - baseline метрик (100%)'],
				avatar: createAvatarDataUri('Елена Ч.', '#789ed4')
			}
		],
		feedback: [
			{ author: 'Ольга Д.', role: 'Ментор', text: 'После демо добавили новый формат фидбека для дизайнеров.', time: '20 фев, 12:30' }
		]
	},
	{
		id: 'market-pulse',
		title: 'Пульс рынка',
		category: 'Analytics',
		categoryKey: 'analytics',
		summary:
			'Аналитический проект для проверки гипотез: сбор продуктовых метрик, визуализация динамики и рекомендации по приоритетам бэклога.',
		stage: 'Спринт 2/6',
		progress: 39,
		progressBreakdown: { done: 28, inProgress: 11, upcoming: 61 },
		participants: 12,
		deadline: 'Июнь 2026',
		completionDateText: 'Завершается 20 июня 2026 года',
		seats: 3,
		status: 'active',
		resultsUrl: '#results-market-pulse',
		joinUrl: '#apply',
		timeline: [
			{ name: 'Схема метрик', dates: '12 янв - 31 янв', state: 'done' },
			{ name: 'Data pipeline', dates: '01 фев - 10 мар', state: 'progress' },
			{ name: 'Дашборд и инсайты', dates: '11 мар - 20 июн', state: 'planned' }
		],
		tasks: {
			done: [createTask('mp-d-1', 'Определены продуктовые KPI', 'Завершено 31 янв', 'Роман Г.', ['Product docs'], ['Metric tree'])],
			inProgress: [
				createTask('mp-p-1', 'Сбор event-стрима', 'Срок 02 мар', 'Тимур К.', ['Kafka'], ['Schema registry']),
				createTask('mp-p-2', 'ETL в витрину', 'Срок 08 мар', 'Людмила Ф.', ['dbt'], ['Model tests'])
			],
			upcoming: [
				createTask('mp-u-1', 'Дашборд для продуктовой команды', 'Старт 15 мар', 'Роман Г.', ['BI'], ['Mockups']),
				createTask('mp-u-2', 'Финальный пакет инсайтов', 'Старт 10 июн', 'Команда проекта', ['Slides'], ['Outline'])
			]
		},
		mentors: [
			{
				name: 'Роман Г.',
				specialization: 'Product analytics',
				role: 'Ведет карту метрик и гипотезы роста',
				avatar: createAvatarDataUri('Роман Г.', '#3664a7')
			}
		],
		members: [
			{
				name: 'Тимур К.',
				role: 'Data engineer',
				activity: 'Разворачивает поток событий',
				progress: 49,
				history: ['20 фев - consumer lag снижен (55%)', '14 фев - ingestion pipeline (100%)'],
				avatar: createAvatarDataUri('Тимур К.', '#4d74b7')
			},
			{
				name: 'Людмила Ф.',
				role: 'BI analyst',
				activity: 'Собирает витрину и витальные графики',
				progress: 42,
				history: ['19 фев - модель churn (50%)', '15 фев - модель DAU (100%)'],
				avatar: createAvatarDataUri('Людмила Ф.', '#7a9fd3')
			}
		],
		feedback: [
			{ author: 'Роман Г.', role: 'Ментор', text: 'Следующий шаг - зафиксировать пороги KPI для алертов.', time: '18 фев, 15:05' }
		]
	}
]

function addAvatarsToProjects(projectList) {
	return projectList.map(project => ({
		...project,
		mentors: (project.mentors || []).map(mentor => ({
			...mentor,
			avatar: createAvatarDataUri(mentor.name, mentor.avatarColor || '#3f6fb3')
		})),
		members: (project.members || []).map(member => ({
			...member,
			avatar: createAvatarDataUri(member.name, member.avatarColor || '#4b7ac0')
		}))
	}))
}

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

const taskGroupConfig = [
	{ key: 'done', label: 'Выполненные задачи', className: 'project-modal__task-group--done' },
	{ key: 'inProgress', label: 'Задачи в процессе', className: 'project-modal__task-group--progress' },
	{ key: 'upcoming', label: 'Предстоящие задачи', className: 'project-modal__task-group--upcoming' }
]
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
	const location = useLocation()
	const [projects, setProjects] = useState(() => addAvatarsToProjects(FALLBACK_PROJECTS))
	const [isLoading, setIsLoading] = useState(true)
	const [selectedCategoryKey, setSelectedCategoryKey] = useState('all')
	const [activeProjectId, setActiveProjectId] = useState(null)
	const [expandedTaskIds, setExpandedTaskIds] = useState([])
	const [feedbackDraft, setFeedbackDraft] = useState('')
	const [extraFeedbackByProject, setExtraFeedbackByProject] = useState({})
	const [liveTick, setLiveTick] = useState(Date.now())
	const [isJoinTransitionVisible, setIsJoinTransitionVisible] = useState(false)
	const [isArrivingFromBack, setIsArrivingFromBack] = useState(Boolean(location.state?.fromSuccessBack))

	useEffect(() => {
		fetchProjects()
			.then(data => setProjects(addAvatarsToProjects(data)))
			.catch(() => {
				// Fallback to hardcoded data if API is unavailable
				setProjects(addAvatarsToProjects(FALLBACK_PROJECTS))
			})
			.finally(() => setIsLoading(false))
	}, [])

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

	const activeProjectFeedback = activeProject
		? [...activeProject.feedback, ...(extraFeedbackByProject[activeProject.id] ?? [])]
		: []

	useEffect(() => {
		if (!activeProject) {
			return undefined
		}

		const handleEscape = event => {
			if (event.key === 'Escape') {
				setActiveProjectId(null)
			}
		}

		const tickInterval = setInterval(() => setLiveTick(Date.now()), 6000)
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', handleEscape)

		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', handleEscape)
			clearInterval(tickInterval)
		}
	}, [activeProject])

	useEffect(() => {
		if (!isArrivingFromBack) {
			return undefined
		}

		const timerId = window.setTimeout(() => {
			setIsArrivingFromBack(false)
		}, 520)

		return () => {
			window.clearTimeout(timerId)
		}
	}, [isArrivingFromBack])

	const openProjectModal = projectId => {
		setActiveProjectId(projectId)
		setExpandedTaskIds([])
		setFeedbackDraft('')
	}

	const closeProjectModal = () => {
		setActiveProjectId(null)
	}

	const toggleTask = taskId => {
		setExpandedTaskIds(currentIds =>
			currentIds.includes(taskId) ? currentIds.filter(id => id !== taskId) : [...currentIds, taskId]
		)
	}

	const submitFeedback = useCallback(async () => {
		const trimmedFeedback = feedbackDraft.trim()
		if (!activeProject || !trimmedFeedback) {
			return
		}

		const localFallback = {
			author: 'Вы',
			role: 'Наблюдатель проекта',
			text: trimmedFeedback,
			time: new Date().toLocaleString('ru-RU', {
				day: '2-digit',
				month: 'short',
				hour: '2-digit',
				minute: '2-digit'
			})
		}

		try {
			const saved = await submitProjectFeedback(activeProject.id, {
				author: 'Вы',
				role: 'Наблюдатель проекта',
				text: trimmedFeedback
			})
			setExtraFeedbackByProject(currentState => ({
				...currentState,
				[activeProject.id]: [...(currentState[activeProject.id] ?? []), saved]
			}))
		} catch {
			setExtraFeedbackByProject(currentState => ({
				...currentState,
				[activeProject.id]: [...(currentState[activeProject.id] ?? []), localFallback]
			}))
		}
		setFeedbackDraft('')
	}, [activeProject, feedbackDraft])

	const getLiveMemberProgress = progressValue => {
		const wave = Math.round(Math.sin(liveTick / 5000) * 2)
		return Math.min(100, Math.max(0, progressValue + wave))
	}

	const handleJoin = async project => {
		if (project.seats < 1 || isJoinTransitionVisible) {
			return
		}

		try {
			await joinProject(project.id)
		} catch {
			// Continue with transition even if API fails
		}

		setIsJoinTransitionVisible(true)
		setActiveProjectId(null)

		window.setTimeout(() => {
			navigate('/projects/join-success', { state: { fromJoinTransition: true } })
		}, 440)
	}

	return (
		<main className={`projects-page${isJoinTransitionVisible ? ' projects-page--joining' : ''}${isArrivingFromBack ? ' projects-page--arriving' : ''}`}>
			<section className="projects-hero">
				<motion.div className="projects-hero__inner" variants={stagger} initial="hidden" animate="visible">
					<motion.p className="projects-hero__label" variants={fadeUp}>NEVA PROJECT HUB</motion.p>
					<motion.h1 className="projects-hero__title" variants={fadeUp}>Проекты в реальном времени</motion.h1>
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

					<motion.label className="projects-board__select-wrap" variants={fadeUpSoft}>
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
					</motion.label>
				</motion.div>

				<motion.div
					key={safeCategoryKey}
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
							<p className="project-card__stage">{project.stage}</p>

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

							<p className="project-card__summary">{project.summary}</p>

							<div className="project-card__actions">
								<button type="button" className="project-card__details-toggle" onClick={() => openProjectModal(project.id)}>
									Подробнее
								</button>
								<button type="button" className="project-card__cta" onClick={() => handleJoin(project)}>
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
									<p>{activeProject.completionDateText}</p>
								</div>
							</header>

							<section className="project-modal__section">
								<div className="project-modal__section-head">
									<h3>Прогресс проекта в реальном времени</h3>
									<span>{activeProject.stage} · {activeProject.progress}% завершено</span>
								</div>
								<div className="project-modal__segmented-progress" aria-label="Декомпозиция прогресса проекта">
									<div className="project-modal__progress-done" style={{ width: `${activeProject.progressBreakdown.done}%` }} />
									<div className="project-modal__progress-in-progress" style={{ width: `${activeProject.progressBreakdown.inProgress}%` }} />
									<div className="project-modal__progress-upcoming" style={{ width: `${activeProject.progressBreakdown.upcoming}%` }} />
								</div>
								<div className="project-modal__progress-legend">
									<p><span className="legend-dot legend-dot--done" /> Выполненные задачи</p>
									<p><span className="legend-dot legend-dot--progress" /> Задачи в процессе</p>
									<p><span className="legend-dot legend-dot--upcoming" /> Предстоящие задачи</p>
								</div>
								<div className="project-modal__gantt" aria-label="Диаграмма Ганта по этапам проекта">
									{activeProject.timeline.map(item => (
										<div key={`${activeProject.id}-${item.name}`} className={`project-modal__gantt-item project-modal__gantt-item--${item.state}`}>
											<strong>{item.name}</strong>
											<span>{item.dates}</span>
										</div>
									))}
								</div>
							</section>

							<section className="project-modal__section">
								<h3>Детализированный ход проекта</h3>
								<div className="project-modal__task-groups">
									{taskGroupConfig.map(groupConfig => (
										<div key={`${activeProject.id}-${groupConfig.key}`} className={`project-modal__task-group ${groupConfig.className}`}>
											<h4>{groupConfig.label}</h4>
											<ul>
												{activeProject.tasks[groupConfig.key].map(task => {
													const isTaskExpanded = expandedTaskIds.includes(task.id)
													return (
														<li key={task.id}>
															<button type="button" className="project-modal__task-trigger" onClick={() => toggleTask(task.id)} aria-expanded={isTaskExpanded}>
																<span>{task.title}</span>
																<small>{task.timeLabel}</small>
															</button>
															<AnimatePresence initial={false}>
																{isTaskExpanded && (
																	<motion.div
																		className="project-modal__task-details"
																		initial={{ opacity: 0, height: 0 }}
																		animate={{ opacity: 1, height: 'auto' }}
																		exit={{ opacity: 0, height: 0 }}
																		transition={{ duration: 0.18, ease: 'easeOut' }}
																	>
																		<p><strong>Ответственный:</strong> {task.owner}</p>
																		<p><strong>Ресурсы:</strong> {task.resources.join(', ')}</p>
																		<p><strong>Завершенные этапы:</strong> {task.stagesDone.join(', ')}</p>
																	</motion.div>
																)}
															</AnimatePresence>
														</li>
													)
												})}
											</ul>
										</div>
									))}
								</div>
							</section>

							<section className="project-modal__section">
								<h3>Менторы и их роль</h3>
								<div className="project-modal__people-grid">
									{activeProject.mentors.map(mentor => (
										<article key={`${activeProject.id}-${mentor.name}`} className="project-modal__person-card">
											<img src={mentor.avatar} alt={`Фото ментора ${mentor.name}`} />
											<div>
												<h4>{mentor.name}</h4>
												<p>{mentor.specialization}</p>
												<p>{mentor.role}</p>
											</div>
										</article>
									))}
								</div>
							</section>

							<section className="project-modal__section">
								<h3>Участники проекта</h3>
								<div className="project-modal__people-grid">
									{activeProject.members.map(member => {
										const memberProgress = getLiveMemberProgress(member.progress)
										return (
											<article key={`${activeProject.id}-${member.name}`} className="project-modal__person-card">
												<img src={member.avatar} alt={`Фото участника ${member.name}`} />
												<div>
													<h4>{member.name}</h4>
													<p>{member.role}</p>
													<p>{member.activity}</p>
													<div className="project-modal__member-progress" aria-label={`Прогресс участника ${memberProgress}%`}>
														<div style={{ width: `${memberProgress}%` }} />
													</div>
													<ul className="project-modal__history">
														{member.history.map(item => (
															<li key={`${member.name}-${item}`}>{item}</li>
														))}
													</ul>
												</div>
											</article>
										)
									})}
								</div>
							</section>

							<section className="project-modal__section">
								<h3>Обратная связь</h3>
								<div className="project-modal__feedback-feed">
									{activeProjectFeedback.map((note, index) => (
										<article key={`${activeProject.id}-feedback-${index}`} className="project-modal__feedback-item">
											<header>
												<strong>{note.author}</strong>
												<span>{note.role}</span>
												<time>{note.time}</time>
											</header>
											<p>{note.text}</p>
										</article>
									))}
								</div>
								<div className="project-modal__feedback-form">
									<label htmlFor="project-feedback">Комментарий по этапу или задаче</label>
									<textarea
										id="project-feedback"
										value={feedbackDraft}
										onChange={event => setFeedbackDraft(event.target.value)}
										placeholder="Оставьте отзыв или предложение по улучшению"
									/>
									<button type="button" onClick={submitFeedback}>
										Оставить отзыв
									</button>
								</div>
							</section>

														<footer className="project-modal__footer">
								<button
									type="button"
									className={`project-modal__primary-action${
										activeProject.status === 'active' && activeProject.seats < 1 ? ' project-modal__primary-action--disabled' : ''
									}`}
									onClick={() => {
										if (activeProject.status === 'completed') {
											window.location.assign(activeProject.resultsUrl)
											return
										}
										handleJoin(activeProject)
									}}
								>
									{activeProject.status === 'completed' ? 'Просмотреть результаты' : 'Присоединиться'}
								</button>
							</footer>
						</motion.section>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{isJoinTransitionVisible && (
					<motion.div
						className="join-transition"
						initial={{ opacity: 0, backdropFilter: 'blur(0px)', backgroundColor: 'rgba(16, 35, 64, 0)' }}
						animate={{ opacity: 1, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(16, 35, 64, 0.2)' }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.42, ease: [0.25, 0.7, 0.2, 1] }}
					/>
				)}
			</AnimatePresence>
		</main>
	)
}







