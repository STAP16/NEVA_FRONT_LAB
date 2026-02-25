import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const projects = [
	{
		id: 'edu-track',
		title: 'Учебный трек',
		category: 'Web',
		categoryKey: 'web',
		summary: 'Платформа для персональных траекторий обучения: задания по уровням, прогресс в реальном времени и дашборд для менторов.',
		stage: 'Спринт 3/5',
		progress: 62,
		progressDone: 48,
		progressInProgress: 14,
		progressUpcoming: 38,
		participants: 14,
		deadline: 'Март 2026',
		completionDateText: 'Завершается 30 марта 2026 года',
		seats: 4,
		status: 'active',
		resultsUrl: '#results-edu-track',
		joinUrl: '#apply',
		sortOrder: 0,
		timeline: [
			{ name: 'Исследование', dates: '08 янв - 21 янв', state: 'done', sortOrder: 0 },
			{ name: 'MVP', dates: '22 янв - 18 фев', state: 'progress', sortOrder: 1 },
			{ name: 'Тесты и релиз', dates: '19 фев - 30 мар', state: 'planned', sortOrder: 2 }
		],
		tasks: [
			{ taskKey: 'edu-d-1', groupKey: 'done', title: 'Собрали карту пользовательских сценариев', timeLabel: 'Завершено 21 янв', owner: 'Анна К.', resources: ['Miro', 'Интервью'], stagesDone: ['Аналитика', 'Приоритизация'], sortOrder: 0 },
			{ taskKey: 'edu-d-2', groupKey: 'done', title: 'Настроили API авторизации', timeLabel: 'Завершено 30 янв', owner: 'Михаил Н.', resources: ['Node.js', 'JWT'], stagesDone: ['Backend core'], sortOrder: 1 },
			{ taskKey: 'edu-p-1', groupKey: 'inProgress', title: 'Личный кабинет студента', timeLabel: 'Срок 24 фев', owner: 'Илья Р.', resources: ['React', 'Figma'], stagesDone: ['UI кит', 'Маршрутизация'], sortOrder: 2 },
			{ taskKey: 'edu-p-2', groupKey: 'inProgress', title: 'Дашборд ментора', timeLabel: 'Срок 28 фев', owner: 'Дарья П.', resources: ['Charts', 'SQL'], stagesDone: ['Витрина метрик'], sortOrder: 3 },
			{ taskKey: 'edu-u-1', groupKey: 'upcoming', title: 'Нагрузочное тестирование', timeLabel: 'Старт 3 мар', owner: 'Егор М.', resources: ['k6', 'CI'], stagesDone: ['План тестов'], sortOrder: 4 },
			{ taskKey: 'edu-u-2', groupKey: 'upcoming', title: 'Публичная демо-защита', timeLabel: 'Старт 25 мар', owner: 'Команда проекта', resources: ['Презентация'], stagesDone: ['Сценарий демо'], sortOrder: 5 }
		],
		mentors: [
			{ name: 'Анна К.', specialization: 'Ведущий backend-разработчик', role: 'Курирует архитектуру и ревью API', avatarColor: '#3f6fb3', sortOrder: 0 },
			{ name: 'Михаил Н.', specialization: 'Продуктовый дизайнер', role: 'Отвечает за UX и валидацию интерфейсов', avatarColor: '#5a88cc', sortOrder: 1 }
		],
		members: [
			{ name: 'Илья Р.', role: 'Frontend-разработчик', activity: 'Собирает личный кабинет и адаптивные экраны', progress: 66, history: ['20 фев - интеграция формы входа (80%)', '18 фев - сверстал профиль (100%)'], avatarColor: '#4b7ac0', sortOrder: 0 },
			{ name: 'Дарья П.', role: 'Data analyst', activity: 'Настраивает метрики активности и retention', progress: 58, history: ['19 фев - витрина событий (70%)', '16 фев - схема трекинга (100%)'], avatarColor: '#6a94d2', sortOrder: 1 }
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
		summary: 'AI-сервис для студентов и горожан: маршруты, ответы на частые вопросы и быстрый доступ к городским и кампусным сервисам.',
		stage: 'Спринт 2/4',
		progress: 48,
		progressDone: 35,
		progressInProgress: 13,
		progressUpcoming: 52,
		participants: 11,
		deadline: 'Апрель 2026',
		completionDateText: 'Завершается 18 апреля 2026 года',
		seats: 3,
		status: 'active',
		resultsUrl: '#results-city-assist',
		joinUrl: '#apply',
		sortOrder: 1,
		timeline: [
			{ name: 'Сбор данных', dates: '10 янв - 26 янв', state: 'done', sortOrder: 0 },
			{ name: 'NLP ядро', dates: '27 янв - 01 мар', state: 'progress', sortOrder: 1 },
			{ name: 'Интеграции', dates: '02 мар - 18 апр', state: 'planned', sortOrder: 2 }
		],
		tasks: [
			{ taskKey: 'city-d-1', groupKey: 'done', title: 'Сформировали базу FAQ', timeLabel: 'Завершено 26 янв', owner: 'Софья Л.', resources: ['Notion', 'CSV'], stagesDone: ['Кластеризация тем'], sortOrder: 0 },
			{ taskKey: 'city-d-2', groupKey: 'done', title: 'Собрали intent-модель', timeLabel: 'Завершено 08 фев', owner: 'Даниил Р.', resources: ['Python', 'spaCy'], stagesDone: ['Подготовка датасета'], sortOrder: 1 },
			{ taskKey: 'city-p-1', groupKey: 'inProgress', title: 'Точность классификации > 90%', timeLabel: 'Срок 27 фев', owner: 'Глеб В.', resources: ['MLflow'], stagesDone: ['Валидация', 'Тюнинг'], sortOrder: 2 },
			{ taskKey: 'city-p-2', groupKey: 'inProgress', title: 'Интеграция Telegram-бота', timeLabel: 'Срок 03 мар', owner: 'Софья Л.', resources: ['Telegram API'], stagesDone: ['Webhook'], sortOrder: 3 },
			{ taskKey: 'city-u-1', groupKey: 'upcoming', title: 'Запуск пилота в кампусе', timeLabel: 'Старт 10 мар', owner: 'Команда проекта', resources: ['Google Forms'], stagesDone: ['Сценарий пилота'], sortOrder: 4 },
			{ taskKey: 'city-u-2', groupKey: 'upcoming', title: 'Итоговая отчетность', timeLabel: 'Старт 12 апр', owner: 'Даниил Р.', resources: ['Slides'], stagesDone: ['Черновик отчета'], sortOrder: 5 }
		],
		mentors: [
			{ name: 'Даниил Р.', specialization: 'ML-инженер', role: 'Курирует качество модели и архитектуру пайплайна', avatarColor: '#2f5fa5', sortOrder: 0 },
			{ name: 'Софья Л.', specialization: 'AI product owner', role: 'Отвечает за сценарии использования и запуск пилота', avatarColor: '#5a83c8', sortOrder: 1 }
		],
		members: [
			{ name: 'Глеб В.', role: 'ML-разработчик', activity: 'Дотюнивает классификацию интентов', progress: 54, history: ['19 фев - precision +4% (60%)', '15 фев - baseline-модель (100%)'], avatarColor: '#4d73b6', sortOrder: 0 },
			{ name: 'Надежда С.', role: 'Prompt-инженер', activity: 'Пишет шаблоны ответов и guardrails', progress: 61, history: ['20 фев - набор системных промптов (75%)', '17 фев - tone of voice (100%)'], avatarColor: '#7ba0db', sortOrder: 1 }
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
		summary: 'Мобильное приложение для расписания, событий и командной работы. Фокус на ежедневных сценариях студентов и push-напоминаниях.',
		stage: 'Финальная сборка',
		progress: 87,
		progressDone: 74,
		progressInProgress: 13,
		progressUpcoming: 13,
		participants: 9,
		deadline: 'Февраль 2026',
		completionDateText: 'Завершается 27 февраля 2026 года',
		seats: 2,
		status: 'active',
		resultsUrl: '#results-campus-flow',
		joinUrl: '#apply',
		sortOrder: 2,
		timeline: [
			{ name: 'Прототип', dates: '05 янв - 19 янв', state: 'done', sortOrder: 0 },
			{ name: 'Основной релиз', dates: '20 янв - 20 фев', state: 'progress', sortOrder: 1 },
			{ name: 'App Store/Play', dates: '21 фев - 27 фев', state: 'planned', sortOrder: 2 }
		],
		tasks: [
			{ taskKey: 'camp-d-1', groupKey: 'done', title: 'Готова офлайн-лента расписания', timeLabel: 'Завершено 12 фев', owner: 'Егор М.', resources: ['React Native'], stagesDone: ['Кэш', 'Синхронизация'], sortOrder: 0 },
			{ taskKey: 'camp-d-2', groupKey: 'done', title: 'Подключены push-уведомления', timeLabel: 'Завершено 15 фев', owner: 'Ника К.', resources: ['Firebase'], stagesDone: ['Push сценарии'], sortOrder: 1 },
			{ taskKey: 'camp-p-1', groupKey: 'inProgress', title: 'Финальное тестирование релиза', timeLabel: 'Срок 23 фев', owner: 'QA-группа', resources: ['TestFlight'], stagesDone: ['Smoke tests'], sortOrder: 2 },
			{ taskKey: 'camp-p-2', groupKey: 'inProgress', title: 'Подготовка store-материалов', timeLabel: 'Срок 24 фев', owner: 'Мария Т.', resources: ['App Store Connect'], stagesDone: ['Тексты карточек'], sortOrder: 3 },
			{ taskKey: 'camp-u-1', groupKey: 'upcoming', title: 'Публикация в сторы', timeLabel: 'Старт 25 фев', owner: 'Егор М.', resources: ['Release checklist'], stagesDone: ['Approval'], sortOrder: 4 },
			{ taskKey: 'camp-u-2', groupKey: 'upcoming', title: 'Сбор пост-релизного фидбека', timeLabel: 'Старт 28 фев', owner: 'Команда проекта', resources: ['Form'], stagesDone: ['Список метрик'], sortOrder: 5 }
		],
		mentors: [
			{ name: 'Егор М.', specialization: 'Мобильная разработка', role: 'Ведет релизный контур и QA-процесс', avatarColor: '#315e9f', sortOrder: 0 }
		],
		members: [
			{ name: 'Мария Т.', role: 'Product manager', activity: 'Закрывает релизный чеклист', progress: 82, history: ['20 фев - чеклист 18/22 (82%)', '17 фев - аудит багов (100%)'], avatarColor: '#5178b8', sortOrder: 0 },
			{ name: 'Ника К.', role: 'Mobile developer', activity: 'Шлифует переходы и onboarding', progress: 88, history: ['19 фев - onboarding flow (90%)', '14 фев - push-модуль (100%)'], avatarColor: '#6f95cf', sortOrder: 1 }
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
		summary: 'Единая дизайн-система для проектов NEVA LAB: компоненты, токены и гайды, чтобы быстрее запускать интерфейсы без потери качества.',
		stage: 'Спринт 1/3',
		progress: 31,
		progressDone: 20,
		progressInProgress: 11,
		progressUpcoming: 69,
		participants: 7,
		deadline: 'Май 2026',
		completionDateText: 'Завершается 15 мая 2026 года',
		seats: 5,
		status: 'active',
		resultsUrl: '#results-lab-kit-ui',
		joinUrl: '#apply',
		sortOrder: 3,
		timeline: [
			{ name: 'Базовые токены', dates: '01 фев - 18 фев', state: 'progress', sortOrder: 0 },
			{ name: 'Компоненты', dates: '19 фев - 22 апр', state: 'planned', sortOrder: 1 },
			{ name: 'Гайдлайн', dates: '23 апр - 15 мая', state: 'planned', sortOrder: 2 }
		],
		tasks: [
			{ taskKey: 'ui-d-1', groupKey: 'done', title: 'Собран набор цветовых токенов', timeLabel: 'Завершено 12 фев', owner: 'Вероника С.', resources: ['Figma'], stagesDone: ['Color system'], sortOrder: 0 },
			{ taskKey: 'ui-p-1', groupKey: 'inProgress', title: 'Типографика и сетки', timeLabel: 'Срок 26 фев', owner: 'Илья П.', resources: ['Figma Variables'], stagesDone: ['Desktop scale'], sortOrder: 1 },
			{ taskKey: 'ui-p-2', groupKey: 'inProgress', title: 'Базовые input-компоненты', timeLabel: 'Срок 01 мар', owner: 'Алиса К.', resources: ['Storybook'], stagesDone: ['States'], sortOrder: 2 },
			{ taskKey: 'ui-u-1', groupKey: 'upcoming', title: 'Документация по компонентам', timeLabel: 'Старт 10 мар', owner: 'Вероника С.', resources: ['Notion'], stagesDone: ['Template'], sortOrder: 3 },
			{ taskKey: 'ui-u-2', groupKey: 'upcoming', title: 'Внедрение в 3 проекта', timeLabel: 'Старт 12 апр', owner: 'Команда проекта', resources: ['Design QA'], stagesDone: ['Pilot plan'], sortOrder: 4 }
		],
		mentors: [
			{ name: 'Вероника С.', specialization: 'Lead UI/UX', role: 'Определяет стандарты дизайн-системы', avatarColor: '#3a68a8', sortOrder: 0 },
			{ name: 'Илья П.', specialization: 'Дизайн-инженер', role: 'Синхронизирует токены и фронтенд-компоненты', avatarColor: '#6289c8', sortOrder: 1 }
		],
		members: [
			{ name: 'Алиса К.', role: 'UI дизайнер', activity: 'Собирает библиотеку компонентов формы', progress: 45, history: ['20 фев - states для input (55%)', '18 фев - variants кнопок (100%)'], avatarColor: '#4f77b7', sortOrder: 0 },
			{ name: 'Олег Л.', role: 'Frontend developer', activity: 'Переносит компоненты в Storybook', progress: 39, history: ['19 фев - token bridge (40%)', '14 фев - base setup (100%)'], avatarColor: '#769cd3', sortOrder: 1 }
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
		summary: 'Ассистент для команд: подсказывает следующий шаг в спринте, собирает фидбек после демо и помогает не терять темп разработки.',
		stage: 'Спринт 4/5',
		progress: 79,
		progressDone: 63,
		progressInProgress: 16,
		progressUpcoming: 21,
		participants: 16,
		deadline: 'Март 2026',
		completionDateText: 'Завершается 22 марта 2026 года',
		seats: 1,
		status: 'active',
		resultsUrl: '#results-mentor-bot',
		joinUrl: '#apply',
		sortOrder: 4,
		timeline: [
			{ name: 'Архитектура агента', dates: '03 янв - 25 янв', state: 'done', sortOrder: 0 },
			{ name: 'Интеграция в трекер', dates: '26 янв - 29 фев', state: 'progress', sortOrder: 1 },
			{ name: 'Релиз и обучение', dates: '01 мар - 22 мар', state: 'planned', sortOrder: 2 }
		],
		tasks: [
			{ taskKey: 'mb-d-1', groupKey: 'done', title: 'Бот публикует next-step после стендапа', timeLabel: 'Завершено 11 фев', owner: 'Артем В.', resources: ['Slack API'], stagesDone: ['Core loop'], sortOrder: 0 },
			{ taskKey: 'mb-d-2', groupKey: 'done', title: 'Собран шаблон ретро-фидбека', timeLabel: 'Завершено 15 фев', owner: 'Ольга Д.', resources: ['Prompt templates'], stagesDone: ['Feedback schema'], sortOrder: 1 },
			{ taskKey: 'mb-p-1', groupKey: 'inProgress', title: 'Персональные рекомендации по роли', timeLabel: 'Срок 26 фев', owner: 'Павел А.', resources: ['Role model'], stagesDone: ['Prompt routing'], sortOrder: 2 },
			{ taskKey: 'mb-u-1', groupKey: 'upcoming', title: 'Онбординг для новых команд', timeLabel: 'Старт 03 мар', owner: 'Ольга Д.', resources: ['Guide'], stagesDone: ['Demo scripts'], sortOrder: 3 }
		],
		mentors: [
			{ name: 'Артем В.', specialization: 'AI architect', role: 'Курирует архитектуру агента и интеграции', avatarColor: '#325fa3', sortOrder: 0 },
			{ name: 'Ольга Д.', specialization: 'Learning designer', role: 'Отвечает за сценарии обучения и фидбек', avatarColor: '#5e84c6', sortOrder: 1 }
		],
		members: [
			{ name: 'Павел А.', role: 'NLP engineer', activity: 'Реализует персонализацию рекомендаций', progress: 72, history: ['20 фев - роль PM покрыта (80%)', '16 фев - data mapping (100%)'], avatarColor: '#4d75b8', sortOrder: 0 },
			{ name: 'Елена Ч.', role: 'Product analyst', activity: 'Собирает метрики вовлеченности', progress: 68, history: ['19 фев - retention дашборд (70%)', '13 фев - baseline метрик (100%)'], avatarColor: '#789ed4', sortOrder: 1 }
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
		summary: 'Аналитический проект для проверки гипотез: сбор продуктовых метрик, визуализация динамики и рекомендации по приоритетам бэклога.',
		stage: 'Спринт 2/6',
		progress: 39,
		progressDone: 28,
		progressInProgress: 11,
		progressUpcoming: 61,
		participants: 12,
		deadline: 'Июнь 2026',
		completionDateText: 'Завершается 20 июня 2026 года',
		seats: 3,
		status: 'active',
		resultsUrl: '#results-market-pulse',
		joinUrl: '#apply',
		sortOrder: 5,
		timeline: [
			{ name: 'Схема метрик', dates: '12 янв - 31 янв', state: 'done', sortOrder: 0 },
			{ name: 'Data pipeline', dates: '01 фев - 10 мар', state: 'progress', sortOrder: 1 },
			{ name: 'Дашборд и инсайты', dates: '11 мар - 20 июн', state: 'planned', sortOrder: 2 }
		],
		tasks: [
			{ taskKey: 'mp-d-1', groupKey: 'done', title: 'Определены продуктовые KPI', timeLabel: 'Завершено 31 янв', owner: 'Роман Г.', resources: ['Product docs'], stagesDone: ['Metric tree'], sortOrder: 0 },
			{ taskKey: 'mp-p-1', groupKey: 'inProgress', title: 'Сбор event-стрима', timeLabel: 'Срок 02 мар', owner: 'Тимур К.', resources: ['Kafka'], stagesDone: ['Schema registry'], sortOrder: 1 },
			{ taskKey: 'mp-p-2', groupKey: 'inProgress', title: 'ETL в витрину', timeLabel: 'Срок 08 мар', owner: 'Людмила Ф.', resources: ['dbt'], stagesDone: ['Model tests'], sortOrder: 2 },
			{ taskKey: 'mp-u-1', groupKey: 'upcoming', title: 'Дашборд для продуктовой команды', timeLabel: 'Старт 15 мар', owner: 'Роман Г.', resources: ['BI'], stagesDone: ['Mockups'], sortOrder: 3 },
			{ taskKey: 'mp-u-2', groupKey: 'upcoming', title: 'Финальный пакет инсайтов', timeLabel: 'Старт 10 июн', owner: 'Команда проекта', resources: ['Slides'], stagesDone: ['Outline'], sortOrder: 4 }
		],
		mentors: [
			{ name: 'Роман Г.', specialization: 'Product analytics', role: 'Ведет карту метрик и гипотезы роста', avatarColor: '#3664a7', sortOrder: 0 }
		],
		members: [
			{ name: 'Тимур К.', role: 'Data engineer', activity: 'Разворачивает поток событий', progress: 49, history: ['20 фев - consumer lag снижен (55%)', '14 фев - ingestion pipeline (100%)'], avatarColor: '#4d74b7', sortOrder: 0 },
			{ name: 'Людмила Ф.', role: 'BI analyst', activity: 'Собирает витрину и витальные графики', progress: 42, history: ['19 фев - модель churn (50%)', '15 фев - модель DAU (100%)'], avatarColor: '#7a9fd3', sortOrder: 1 }
		],
		feedback: [
			{ author: 'Роман Г.', role: 'Ментор', text: 'Следующий шаг - зафиксировать пороги KPI для алертов.', time: '18 фев, 15:05' }
		]
	}
]

async function main() {
	// Seed projects
	for (const projectData of projects) {
		const { timeline, tasks, mentors, members, feedback, ...project } = projectData

		await prisma.project.upsert({
			where: { id: project.id },
			update: project,
			create: project
		})

		// Clear existing children
		await prisma.timelineItem.deleteMany({ where: { projectId: project.id } })
		await prisma.task.deleteMany({ where: { projectId: project.id } })
		await prisma.mentor.deleteMany({ where: { projectId: project.id } })
		await prisma.member.deleteMany({ where: { projectId: project.id } })
		await prisma.feedback.deleteMany({ where: { projectId: project.id } })

		// Create children
		for (const item of timeline) {
			await prisma.timelineItem.create({ data: { ...item, projectId: project.id } })
		}
		for (const task of tasks) {
			await prisma.task.create({ data: { ...task, projectId: project.id } })
		}
		for (const mentor of mentors) {
			await prisma.mentor.create({ data: { ...mentor, projectId: project.id } })
		}
		for (const member of members) {
			await prisma.member.create({ data: { ...member, projectId: project.id } })
		}
		for (const fb of feedback) {
			await prisma.feedback.create({ data: { ...fb, projectId: project.id } })
		}

		console.log(`Seeded project: ${project.title}`)
	}

	console.log('Seed complete!')
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(() => prisma.$disconnect())
