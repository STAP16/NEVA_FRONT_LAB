import './VisualSection.css'

function VisualSection() {
  const visuals = [
    {
      title: 'Интерфейсы приложений',
      description: 'Скриншоты созданных сервисов: расписание, система бронирования',
      placeholder: '📱'
    },
    {
      title: 'Процесс работы',
      description: 'Живое фото обсуждения у доски или за ноутбуками в лаборатории',
      placeholder: '💻'
    },
    {
      title: 'Презентация проектов',
      description: 'Кадр с презентации проекта заказчику или жюри',
      placeholder: '🎤'
    }
  ]

  return (
    <div className="visual-section">
      <h3 className="visual-section__title">Как это выглядит</h3>
      <div className="visual-section__grid">
        {visuals.map((visual, index) => (
          <div key={index} className="visual-section__item">
            <div className="visual-section__placeholder">
              <span className="visual-section__icon">{visual.placeholder}</span>
            </div>
            <h4 className="visual-section__item-title">{visual.title}</h4>
            <p className="visual-section__item-description">{visual.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export { VisualSection }
