import './ProcessStats.css'

function ProcessStats({ stats }) {
	return (
		<div className="process-stats">
			<p className="process-stats__intro">
				Такой подход — не теория. Это то, что уже принесло результат:
			</p>
			<div className="process-stats__grid">
				{stats.map((stat, index) => (
					<div key={index} className="process-stats__item">
						<span className="process-stats__value">{stat.value}</span>
						<span className="process-stats__label">{stat.label}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export { ProcessStats }
