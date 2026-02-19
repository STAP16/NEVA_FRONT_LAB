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
					<h2 className="process__title">От первой задачи — до кейса в портфолио.</h2>
					<p className="process__subtitle">
						Мы заменили учебную импровизацию на рабочий процесс из digital-индустрии.
					</p>
				</div>

				<ProcessTimeline steps={processSteps} />
			</div>
		</section>
	)
}
