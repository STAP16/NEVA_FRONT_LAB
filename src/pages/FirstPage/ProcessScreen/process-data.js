import checkListIcon from '../../../assets/check_list.svg'
import sprintsIcon from '../../../assets/sprints.svg'
import codeIcon from '../../../assets/code.svg'
import microIcon from '../../../assets/micro.svg'

export const processSteps = [
	{
		id: 1,
		icon: checkListIcon,
		title: 'Погружение и план',
		description:
			'Знакомство с задачей, анализ требований, распределение ролей и планирование первого спринта.'
	},
	{
		id: 2,
		icon: sprintsIcon,
		title: 'Работа в спринтах',
		description:
			'Короткие итерации по 2–3 недели: планирование, ежедневная работа и демо результатов ментору или заказчику.'
	},
	{
		id: 3,
		icon: codeIcon,
		title: 'Финальная сборка и тесты',
		description:
			'Завершение функционала, тестирование, исправление ошибок, подготовка документации и финальной презентации.'
	},
	{
		id: 4,
		icon: microIcon,
		title: 'Презентация результата',
		description:
			'Представление проекта пользователям или заказчику, сбор обратной связи, защита работы и формирование готового кейса для портфолио.'
	}
]

export const processStats = [
	{ value: '15+', label: 'запущенных проектов' },
	{ value: '2500+', label: 'часов менторской поддержки' },
	{ value: '92%', label: 'участников говорят, что опыт стал ключевым для карьеры' }
]
