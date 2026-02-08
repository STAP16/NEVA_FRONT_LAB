import './LearningCards.css'

function LearningCards({ cards }) {
	return (
		<div className="learning-cards">
			{cards.map((card) => {
				const isWide = !!card.features

				return (
					<article
						key={card.id}
						className={`learning-card${isWide ? ' learning-card--wide' : ''}`}
					>
						{isWide ? (
							<>
								<div className="learning-card__header">
									<div className="learning-card__icon">
										<img
											src={card.icon}
											alt={card.title}
											className="learning-card__icon-image"
										/>
									</div>
									<h3 className="learning-card__title">{card.title}</h3>
								</div>
								<p className="learning-card__description">
									{card.description}
								</p>
								{card.subdescription && (
									<p className="learning-card__subdescription">
										{card.subdescription}
									</p>
								)}
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
								{card.footnote && (
									<p className="learning-card__footnote">{card.footnote}</p>
								)}
							</>
						) : (
							<>
								<div className="learning-card__icon">
									<img
										src={card.icon}
										alt={card.title}
										className="learning-card__icon-image"
									/>
								</div>
								<h3 className="learning-card__title">{card.title}</h3>
								<p className="learning-card__description">
									{card.description}
								</p>
							</>
						)}
					</article>
				)
			})}
		</div>
	)
}

export { LearningCards }
