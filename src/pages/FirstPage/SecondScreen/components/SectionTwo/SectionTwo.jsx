import './SectionTwo.css'

function SectionTwo() {
	return (
		<section
			className="directions"
			id="directions"
		>
			<div className="directions__container">
				<header className="directions__header">
					<h1 className="directions__title">Кем ты хочешь быть в следующем семестре?</h1>
				</header>

				<div className="directions__stories">
					<h2 className="directions__stories-title">
						Не просто теория. Вот что уже сделали студенты:
					</h2>
					<div className="story-list">
						<article className="story-card">
							<div
								className="story-card__media story-card__media--mvp"
								aria-hidden="true"
							>
								<div className="mock mock--mvp">
									<div className="mock__bar">
										<span className="mock__dot" />
										<span className="mock__dot" />
										<span className="mock__dot" />
									</div>
									<div className="mock__content">
										<div className="mock__pill" />
										<div className="mock__grid">
											<div className="mock__tile" />
											<div className="mock__tile" />
											<div className="mock__tile" />
											<div className="mock__tile" />
										</div>
									</div>
								</div>
							</div>
							<div className="story-card__content">
								<p className="story-card__label">Личное направление</p>
								<p className="story-card__quote">
									«С нуля собрал MVP приложения для поиска напарников на спорт. Сейчас проект
									тестируют первые пользователи».
								</p>
								<p className="story-card__meta">Имя, факультет</p>
							</div>
						</article>

						<article className="story-card">
							<div
								className="story-card__media story-card__media--landing"
								aria-hidden="true"
							>
								<div className="mock mock--landing">
									<div className="mock__bar">
										<span className="mock__dot" />
										<span className="mock__dot" />
										<span className="mock__dot" />
									</div>
									<div className="mock__hero" />
									<div className="mock__line" />
									<div className="mock__line mock__line--short" />
									<div className="mock__cta" />
								</div>
							</div>
							<div className="story-card__content">
								<p className="story-card__label">Коммерческое направление</p>
								<p className="story-card__quote">
									«В команде из трёх человек за два месяца разработали лендинг для local-бренда.
									Проект ушёл в продакшн».
								</p>
								<p className="story-card__meta">Имя, факультет</p>
							</div>
						</article>

						<article className="story-card">
							<div
								className="story-card__media story-card__media--bot"
								aria-hidden="true"
							>
								<div className="mock mock--phone">
									<div className="mock__speaker" />
									<div className="mock__chat mock__chat--left" />
									<div className="mock__chat mock__chat--right" />
									<div className="mock__chat mock__chat--left" />
									<div className="mock__chat mock__chat--right" />
								</div>
							</div>
							<div className="story-card__content">
								<p className="story-card__label">Колледж</p>
								<p className="story-card__quote">
									«Наш чат-бот для абитуриентов уже обработал 1000+ вопросов и снизил нагрузку на
									приёмную комиссию».
								</p>
								<p className="story-card__meta">Имя, факультет</p>
							</div>
						</article>
					</div>
				</div>

				<div className="directions__cta">
					<a
						className="directions__button directions__button--primary"
						href="#form"
					>
						Хочу так же! Расскажите, как начать
					</a>
					<a
						className="directions__button directions__button--secondary"
						href="#projects"
					>
						Посмотреть все проекты
					</a>
				</div>
			</div>
		</section>
	)
}

export default SectionTwo
