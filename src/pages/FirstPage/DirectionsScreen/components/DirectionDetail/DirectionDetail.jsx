import './DirectionDetail.css'

function DirectionDetail({ icon, category, title, description, forYou, benefits, extra }) {
  return (
    <article className="direction-detail">
      <div className="direction-detail__header">
        <span className="direction-detail__icon">{icon}</span>
        <span className="direction-detail__category">{category}</span>
      </div>

      <h3 className="direction-detail__title">{title}</h3>
      <p className="direction-detail__description">{description}</p>

      <div className="direction-detail__info">
        <div className="direction-detail__block">
          <span className="direction-detail__label">Тебе, если:</span>
          <p className="direction-detail__text">{forYou}</p>
        </div>

        <div className="direction-detail__block">
          <span className="direction-detail__label">Что получишь:</span>
          <p className="direction-detail__text">{benefits}</p>
        </div>

        <div className="direction-detail__block">
          <span className="direction-detail__label">{extra.label}:</span>
          <p className="direction-detail__text">{extra.text}</p>
        </div>
      </div>
    </article>
  )
}

export { DirectionDetail }
