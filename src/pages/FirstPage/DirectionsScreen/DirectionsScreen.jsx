import { DirectionDetail, VisualSection } from './components'
import { directionsData } from './direction-data'

import './DirectionsScreen.css'
import { NavLink } from 'react-router-dom'

function DirectionsScreen() {
	return (
		<section
			className="directions"
			id="projects"
		>
			<div className="directions__container">
				<h2 className="directions__title">
					Собираем команды под задачи.
					<br />
					От идеи — до работающего решения.
					<p className="directions__subtitle">Выбери направление, в котором будешь расти.</p>
				</h2>

				<div className="directions__cards">
					{directionsData.map(direction => (
						<DirectionDetail
							key={direction.type}
							icon={direction.icon}
							category={direction.category}
							type={direction.type}
							title={direction.title}
							description={direction.description}
							forYou={direction.forYou}
							benefits={direction.benefits}
							extra={direction.extra}
						/>
					))}
				</div>

				<VisualSection />

				<div className="directions__cta">
					<NavLink
						to="/portfolio"
						className="directions__cta-button"
					>
						Смотреть реализованные проекты →
					</NavLink>
				</div>
			</div>
		</section>
	)
}

export { DirectionsScreen }
