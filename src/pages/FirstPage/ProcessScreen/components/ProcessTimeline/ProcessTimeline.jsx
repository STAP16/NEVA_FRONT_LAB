import './ProcessTimeline.css'

function ProcessTimeline({ steps }) {
	return (
		<div className="process-timeline">
			{steps.map(step => (
				<article
					key={step.id}
					className="process-step"
				>
					<div className="process-step__number">{step.id}</div>
					<div className="process-step__icon">
						<img
							src={step.icon}
							alt={step.title}
							className="process-step__icon-image"
						/>
					</div>
					<h3 className="process-step__title">{step.title}</h3>
					<p className="process-step__description">{step.description}</p>
				</article>
			))}
		</div>
	)
}

export { ProcessTimeline }
