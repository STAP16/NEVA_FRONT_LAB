import { ProcessTimeline } from './components'
import { processSteps } from './process-data'
import './ProcessScreen.css'

export function ProcessScreen() {
	return (
		<section
			className="process"
			id="process"
		>
			<div className="process__container">
				<div className="process__header">
					<h2 className="process__title">
						От первой задачи — до кейса в портфолио.
						<br />
						Всё по плану.
					</h2>
					<p className="process__subtitle">
						Мы заменили учебную импровизацию на рабочий процесс из digital-индустрии. Каждый проект
						в NEVA LAB проходит через ключевые этапы, где ты не только пишешь код или рисуешь
						интерфейсы, а учишься решать реальные проблемы системно.
					</p>
				</div>

				<ProcessTimeline steps={processSteps} />
			</div>
		</section>
	)
}
