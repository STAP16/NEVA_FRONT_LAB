import './LearningCards.css'

function LearningCards({ cards }) {
	return (
		<div className="learning-cards">
			{cards.map((card) => (
				<article key={card.id} className="learning-card">
					<div className="learning-card__icon">
						<img
							src={card.icon}
							alt={card.title}
							className="learning-card__icon-image"
						/>
					</div>
					<h3 className="learning-card__title">{card.title}</h3>
					<p className="learning-card__description">{card.description}</p>

					{card.features && (
						<div className="learning-card__features">
							{card.features.map((feature, index) => (
								<div key={index} className="learning-card__feature">
									<span className="learning-card__feature-title">
										{feature.title}
									</span>
									<span className="learning-card__feature-text">
										{feature.text}
									</span>
								</div>
							))}
						</div>
					)}

					{card.footnote && (
						<p className="learning-card__footnote">{card.footnote}</p>
					)}
				</article>
			))}
		</div>
	)
}

export { LearningCards }
