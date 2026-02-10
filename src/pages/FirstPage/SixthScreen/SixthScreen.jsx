import { useEffect, useRef, useState } from 'react'
import nevikCap from '../../../assets/nevik_cap.png'
import nevaShip from '../../../assets/neva_ship.png'
import collegeIcon from '../../../assets/college.svg'
import caseIcon from '../../../assets/case.svg'
import rocketIcon from '../../../assets/rocket.svg'
import './SixthScreen.css'

const directions = [
	{
		id: 'college',
		icon: collegeIcon,
		iconAlt: 'Для колледжа',
		text: 'Хочу создавать проекты, которыми будут пользоваться тысячи студентов. Улучшать то, что окружает меня каждый день.'
	},
	{
		id: 'commerce',
		icon: caseIcon,
		iconAlt: 'Для коммерции',
		emoji: '💼',
		text: 'Хочу понять, как работает реальный бизнес, заработать первые деньги на своих навыках и собрать коммерческое портфолио.'
	},
	{
		id: 'startup',
		icon: rocketIcon,
		iconAlt: 'Для стартапа',
		emoji: '🚀',
		text: 'Хочу проверить свою идею, собрать команду и запустить MVP. Начать свой путь в мире стартапов.'
	}
]

export function SixthScreen() {
	const [selectedDirection, setSelectedDirection] = useState(directions[0].id)
	const [isChatVisible, setIsChatVisible] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const sectionElement = sectionRef.current

		if (!sectionElement) return

		const observer = new IntersectionObserver(
			entries => {
				const [entry] = entries

				if (!entry.isIntersecting) return

				setIsChatVisible(true)
				observer.disconnect()
			},
			{ threshold: 0.55 }
		)

		observer.observe(sectionElement)

		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={sectionRef}
			className="start-direction"
			id="start-direction"
		>
			<div className="start-direction__container">
				<div className="start-direction__content">
					<h3 className="start-direction__subtitle">Начни свой проект.</h3>

					<p className="start-direction__question">
						Какое направление резонирует с тобой прямо сейчас?
					</p>

					<div
						className="start-direction__cards"
						role="radiogroup"
						aria-label="Выбор направления"
					>
						{directions.map(direction => (
							<button
								key={direction.id}
								type="button"
								role="radio"
								aria-checked={selectedDirection === direction.id}
								className={`start-direction__card ${selectedDirection === direction.id ? 'is-active' : ''}`}
								onClick={() => setSelectedDirection(direction.id)}
							>
								<span className="start-direction__emoji">
									{direction.icon ? (
										<img
											src={direction.icon}
											alt={direction.iconAlt}
											className="start-direction__icon-image"
										/>
									) : (
										direction.emoji
									)}
								</span>
								<span className="start-direction__card-text">{direction.text}</span>
							</button>
						))}
					</div>

					<p className="start-direction__note">
						Не важно, какой путь ты выберешь — каждый из них ведёт к реальному опыту, проекту в
						портфолио и сообществу единомышленников. Главное — сделать шаг.
					</p>

					<a
						href={`#form?direction=${selectedDirection}`}
						className="start-direction__button"
					>
						Выбрать направление и подать заявку →
					</a>
				</div>

				<div className="start-direction__visuals">
					<div className="start-direction__visual-layer">
						<div className={`start-direction__chat-bubble ${isChatVisible ? 'is-visible' : ''}`}>
							За этой системой — люди, которые каждый день работают с кодом, дизайном, данными и AI.
							Хочешь познакомиться с командой, которая будет тебя вести и делиться опытом?
						</div>
						<img
							src={nevaShip}
							alt="Корабль NEVA"
							className="start-direction__ship"
						/>
						<img
							src={nevikCap}
							alt="Капитан Nevik"
							className="start-direction__cap"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
