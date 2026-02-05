import './DirectionCard.css'

function DirectionCard({ icon, category, title, description }) {
  return (
    <article className="direction-card">
      <div className="direction-card__icon">{icon}</div>
      <span className="direction-card__category">{category}</span>
      <h3 className="direction-card__title">{title}</h3>
      <p className="direction-card__description">{description}</p>
    </article>
  )
}

export { DirectionCard }
