import './ProcessTimeline.css'

function ProcessTimeline({ steps }) {
	return (
		<div className="process-timeline">
			{steps.map((step) => (
				<article key={step.id} className="process-step">
					<div className="process-step__number">{step.id}</div>
					<div className="process-step__icon">{step.icon}</div>
					<h3 className="process-step__title">{step.title}</h3>
					<p className="process-step__description">{step.description}</p>
					<div className="process-step__result">
						<span className="process-step__result-label">На выходе:</span>
						<p className="process-step__result-text">{step.result}</p>
					</div>
				</article>
			))}
		</div>
	)
}

export { ProcessTimeline }
