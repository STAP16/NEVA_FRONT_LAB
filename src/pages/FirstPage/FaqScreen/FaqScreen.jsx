import { useState } from 'react'
import './FaqScreen.css'

const faqItems = [
	{
		question: 'Что такое Лаборатория Neva?',
		answer: (
			<p>
				Это среда, где участники проходят путь от новичка до наставника через проекты, системное
				обучение и командную работу.
			</p>
		)
	},
	{
		question: 'Для кого это?',
		answer: (
			<>
				<p>Для тех, кто:</p>
				<ul>
					<li>хочет войти в IT с 0</li>
					<li>устал от хаотичных курсов и разразненой информации</li>
					<li>готов работать, а не просто "слушать лекции"</li>
				</ul>
				<p>Если нужен результат за счет других - это не сюда.</p>
			</>
		)
	},
	{
		question: 'Нужен ли опыт?',
		answer: <p>Нет. Но нужна готовность учиться, выполнять задачи и брать ответственность.</p>
	},
	{
		question: 'Что я получу через 6 месяцев?',
		answer: (
			<>
				<ul>
					<li>Понимание процессов разработки</li>
					<li>Опыт работы в команде</li>
					<li>Реальный проект в портфолио</li>
					<li>Навык системного мышления</li>
				</ul>
				<p>Рост зависит от вовлеченности.</p>
			</>
		)
	},
	{
		question: 'Это обучение или работа?',
		answer: <p>Это гибрид. Есть обучение - есть практика - развиваешь в себе отвественность.</p>
	},
	{
		question: 'Сколько времени нужно?',
		answer: <p>В среднем 8-12 часов в неделю. Если меньше - прогресс будет медленным.</p>
	},
	{
		question: 'Что если я "не потяну"?',
		answer: (
			<>
				<p>Здесь не требуют идеальности. Но требуют движения.</p>
				<p>
					Через 6 месяцев ты либо вырос, либо понял, что это не твой путь. И это тоже результат.
				</p>
			</>
		)
	}
]

export function FaqScreen() {
	const [openIndex, setOpenIndex] = useState(null)

	return (
		<section
			className="faq-screen"
			id="faq"
		>
			<div
				className="faq-screen__spot faq-screen__spot--left"
				aria-hidden="true"
			/>
			<div
				className="faq-screen__spot faq-screen__spot--right"
				aria-hidden="true"
			/>

			<div className="faq-screen__container">
				<div className="faq-screen__heading">
					<h2 className="faq-screen__title">FAQ</h2>
					<p className="faq-screen__subtitle">
						Коротко о формате, темпе и результате в Лаборатории Neva.
					</p>
				</div>

				<div className="faq-screen__list">
					{faqItems.map((item, index) => {
						const isOpen = openIndex === index

						return (
							<article
								key={item.question}
								className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
							>
								<button
									type="button"
									className="faq-item__trigger"
									aria-expanded={isOpen}
									aria-controls={`faq-answer-${index}`}
									onClick={() => setOpenIndex(isOpen ? null : index)}
								>
									<span className="faq-item__question">{item.question}</span>
									<span
										className={`faq-item__icon ${isOpen ? 'faq-item__icon--open' : ''}`}
										aria-hidden="true"
									>
										+
									</span>
								</button>

								<div
									id={`faq-answer-${index}`}
									className={`faq-item__answer-wrap ${isOpen ? 'faq-item__answer-wrap--open' : ''}`}
								>
									<div className="faq-item__answer">{item.answer}</div>
								</div>
							</article>
						)
					})}
				</div>
			</div>
		</section>
	)
}
