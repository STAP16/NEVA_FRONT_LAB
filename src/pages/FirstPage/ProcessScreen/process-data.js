import checkListIcon from '../../../assets/check_list.svg'
import sprintsIcon from '../../../assets/sprints.svg'
import codeIcon from '../../../assets/code.svg'
import microIcon from '../../../assets/micro.svg'

export const processSteps = [
	{
		id: 1,
		icon: checkListIcon,
		title: 'Погружение и план',
		description: 'Разбираем задачу, требования и роли. Формируем план первого спринта.'
	},
	{
		id: 2,
		icon: sprintsIcon,
		title: 'Работа в спринтах',
		description: 'Короткие итерации по 2–3 недели: планируем, делаем, показываем результат.'
	},
	{
		id: 3,
		icon: codeIcon,
		title: 'Финальная сборка и тесты',
		description: 'Допиливаем функционал, тестируем, фиксим баги, готовим доку и презентацию.'
	},
	{
		id: 4,
		icon: microIcon,
		title: 'Презентация результата',
		description:
			'Показываем проект заказчику, собираем фидбек, защищаем работу и упаковываем в портфолио.'
	}
]

export const processStats = [
	{ value: '15+', label: 'запущенных проектов' },
	{ value: '2500+', label: 'часов менторской поддержки' },
	{ value: '92%', label: 'участников говорят, что опыт стал ключевым для карьеры' }
]
