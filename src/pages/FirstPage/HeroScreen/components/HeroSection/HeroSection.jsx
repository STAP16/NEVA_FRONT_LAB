import './HeroSection.css'

function HeroSection() {
	return (
		<section className="hero">
			<div className="hero__content">
				<div className="content_about">
					<div className="content_about__block">
						<h1 className="hero__title">Студенческая лаборатория</h1>
						<h2 className="hero__subtitle">цифровых технологий</h2>
						<span className="hero__brand">NEVA</span>
					</div>
				</div>
				<div className="button_container">
					<button className="hero__cta">Присоединиться</button>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
