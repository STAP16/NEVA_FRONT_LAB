import './LearningPath.css'

function LearningPath({ steps }) {
	return (
		<div className="learning-path">
			<h3 className="learning-path__title">
				Твой путь в лаборатории — с поддержкой AI и экспертов
			</h3>
			<div className="learning-path__timeline">
				{steps.map((step) => (
					<div key={step.id} className="learning-path__step">
						<div className="learning-path__step-marker">
							<span className="learning-path__step-number">{step.id}</span>
						</div>
						<div className="learning-path__step-content">
							<h4 className="learning-path__step-title">{step.title}</h4>
							<p className="learning-path__step-description">
								{step.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export { LearningPath }
