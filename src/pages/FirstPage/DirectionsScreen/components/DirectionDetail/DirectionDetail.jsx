import './DirectionDetail.css'
import collegeIcon from '../../../../../assets/college.svg'
import caseIcon from '../../../../../assets/case.svg'
import rocketIcon from '../../../../../assets/rocket.svg'
import { directionsTypes } from '../../direction-data'

const directionIconMap = {
	[directionsTypes.COLLEGE]: collegeIcon,
	[directionsTypes.COMMERCE]: caseIcon,
	[directionsTypes.YOURSELF]: rocketIcon
}

function DirectionDetail({ category, title, type, description }) {

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

		</article>
	)
}

export { DirectionDetail }
