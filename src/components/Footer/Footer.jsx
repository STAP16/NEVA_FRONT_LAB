import './Footer.css'
import nevaLabLogo from '../../assets/neva_lab_logo.png'

function Footer() {
	return (
		<footer className="footer">
			<div className="footer__container">
				<div className="footer__grid">
					{/* Блок 1: Ядро */}
					<div className="footer__block footer__block--core">
						<img
							src={nevaLabLogo}
							alt="NEVA LAB"
							className="footer__logo"
						/>
						<p className="footer__subtitle">
							Студенческая лаборатория цифровых технологий
						</p>
						<p className="footer__description">
							Среда, где идеи превращаются в работающие продукты,
							а студенты — в востребованных специалистов с реальным
							портфолио.
						</p>
					</div>

					{/* Блок 2: Навигация */}
					<div className="footer__block footer__block--nav">
						<h4 className="footer__heading">Навигация</h4>
						<ul className="footer__links">
							<li>
								<a href="#about" className="footer__link">
									О лаборатории
								</a>
							</li>
							<li>
								<a
									href="#directions"
									className="footer__link"
								>
									Направления
								</a>
							</li>
							<li>
								<a href="#college" className="footer__link">
									Для колледжа
								</a>
							</li>
							<li>
								<a href="#commerce" className="footer__link">
									Для коммерции
								</a>
							</li>
							<li>
								<a href="#startups" className="footer__link">
									Для стартапов
								</a>
							</li>
							<li>
								<a href="#projects" className="footer__link">
									Проекты и кейсы
								</a>
							</li>
						</ul>
					</div>

					{/* Блок 3: Сообщество */}
					<div className="footer__block footer__block--community">
						<h4 className="footer__heading">Сообщество</h4>
						<ul className="footer__links">
							<li>
								<a href="#stories" className="footer__link">
									Истории успеха
								</a>
							</li>
							<li>
								<a href="#events" className="footer__link">
									Демодни, митапы, хакатоны
								</a>
							</li>
							<li>
								<a href="#mentors" className="footer__link">
									Стать наставником
								</a>
							</li>
							<li>
								<a href="#partners" className="footer__link">
									Предложить задачу
								</a>
							</li>
							<li>
								<a href="#blog" className="footer__link">
									Блог / Новости
								</a>
							</li>
						</ul>
					</div>

					{/* Блок 4: Контакты и CTA */}
					<div className="footer__block footer__block--contacts">
						<h4 className="footer__heading footer__heading--cta">
							Начни свой проект сегодня
						</h4>
						<a href="#join" className="footer__cta-button">
							Присоединиться к команде
						</a>
						<div className="footer__contact-info">
							<a
								href="mailto:hello@nevalab.ru"
								className="footer__link"
							>
								hello@nevalab.ru
							</a>
							<p className="footer__address">
								СПбПУ, институт среднего профессионального
								образования
							</p>
						</div>
						<div className="footer__socials">
							<a
								href="https://t.me/nevalab"
								className="footer__social-link"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Telegram"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
								</svg>
							</a>
							<a
								href="https://vk.com/nevalab"
								className="footer__social-link"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="VKontakte"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.473 2.27 4.638 2.862 4.638.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
								</svg>
							</a>
							<a
								href="https://github.com/nevalab"
								className="footer__social-link"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Нижняя полоса */}
			<div className="footer__bottom">
				<div className="footer__bottom-container">
					<span className="footer__copyright">
						© 2026 NEVA LAB. Все права за студентами.
					</span>
					<span className="footer__made-by">
						Сделано студентами для студентов с использованием AI
					</span>
					<a href="#privacy" className="footer__privacy-link">
						Политика конфиденциальности
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
