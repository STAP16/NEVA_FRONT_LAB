import { useState } from 'react'
import nevikCap from '../../../assets/nevik_cap.png'
import nevaShip from '../../../assets/neva_ship.png'
import './SixthScreen.css'

const directions = [
	{
		id: 'college',
		emoji: '🏫',
		text: 'Хочу создавать проекты, которыми будут пользоваться тысячи студентов. Улучшать то, что окружает меня каждый день.'
	},
	{
		id: 'commerce',
		emoji: '💼',
		text: 'Хочу понять, как работает реальный бизнес, заработать первые деньги на своих навыках и собрать коммерческое портфолио.'
	},
	{
		id: 'startup',
		emoji: '🚀',
		text: 'Хочу проверить свою идею, собрать команду и запустить MVP. Начать свой путь в мире стартапов.'
	}
]

export function SixthScreen() {
	const [selectedDirection, setSelectedDirection] = useState(directions[0].id)

	return (
		<section
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
								<span className="start-direction__emoji">{direction.emoji}</span>
								<span className="start-direction__card-text">{direction.text}</span>
							</button>
						))}
					</div>

					<p className="start-direction__note">
						За этой системой — люди, которые каждый день работают с кодом, дизайном, данными и AI.
						Хочешь познакомиться с командой, которая будет тебя вести и делиться опытом?
					</p>

					<a
						href={`#form?direction=${selectedDirection}`}
						className="start-direction__button"
					>
						Выбрать направление и подать заявку →
					</a>

					<p className="start-direction__microtext">
						После нажатия тебя перенаправит на форму, где ты сможешь указать выбранное направление и
						оставить контакты. Мы свяжемся в течение 24 часов.
					</p>
				</div>

				<div className="start-direction__visuals">
					<div className="start-direction__visual-layer">
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
		</section>
	)
}
