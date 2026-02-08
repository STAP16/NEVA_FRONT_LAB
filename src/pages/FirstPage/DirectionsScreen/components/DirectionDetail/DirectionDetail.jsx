import './DirectionDetail.css'
import collegeIcon from '../../../../../assets/college.svg'
import caseIcon from '../../../../../assets/case.svg'
import rocketIcon from '../../../../../assets/rocket.svg'
import reactIcon from '../../../../../assets/react.svg'
import { directionsTypes } from '../../direction-data'

const directionIconMap = {
	[directionsTypes.COLLEGE]: collegeIcon,
	[directionsTypes.COMMERCE]: caseIcon,
	[directionsTypes.YOURSELF]: rocketIcon
}

function DirectionDetail({ icon, category, title, type, description, forYou, benefits, extra }) {
	return (
		<article className="direction-detail">
			<div className="direction-detail__header">
				<span className="direction-detail__icon">
					<img
						src={directionIconMap[type]}
						alt={category}
						className="direction-detail__icon-image"
					/>
				</span>
				<span className="direction-detail__category">{category}</span>
			</div>

			<h3 className="direction-detail__title">{title}</h3>
			<p className="direction-detail__description">{description}</p>

			<div className="direction-detail__info">
				<div className="direction-detail__block">
					<span className="direction-detail__label">Тебе, если:</span>
					<p className="direction-detail__text">{forYou}</p>
				</div>

				<div className="direction-detail__block">
					<span className="direction-detail__label">Что получишь:</span>
					<p className="direction-detail__text">{benefits}</p>
				</div>

				<div className="direction-detail__block">
					<span className="direction-detail__label">{extra.label}:</span>
					<p className="direction-detail__text">{extra.text}</p>
				</div>
			</div>
		</article>
	)
}

export { DirectionDetail }
