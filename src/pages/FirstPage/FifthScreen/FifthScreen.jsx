import { LearningCards } from './components'
import { learningCards } from './fifth-screen-data'
import './FifthScreen.css'

export function FifthScreen() {
	return (
		<section
			className="learning"
			id="learning"
		>
			<div className="learning__container">
				<div className="learning__header">
					<h2 className="learning__title">Не знаешь, что учить?</h2>
					<p className="learning__subtitle">
						Хватит гадать, за что браться. <br />
						Мы выработали систему, что и как учить на основе AI-трендов и опыта практиков.
					</p>
				</div>

				<LearningCards cards={learningCards} />
			</div>
		</section>
	)
}
