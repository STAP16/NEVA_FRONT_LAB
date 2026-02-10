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
					<h2 className="learning__title">
						Не знаешь, что учить?
						<br />
						Наш ИИ и менторы уже составили твой план.
					</h2>
					<p className="learning__subtitle">
						Забудь про бесконечный поиск и устаревшие гайды. Мы используем AI-инструменты, чтобы
						анализировать актуальные тренды и потребности проектов, а наши практики дополняют это
						личным опытом. На выходе — персонализированная дорожная карта с курсами, видео и
						задачами, которая ведёт тебя от новичка до уверенного разработчика в твоём проекте.
					</p>
				</div>

				<LearningCards cards={learningCards} />
			</div>
		</section>
	)
}
