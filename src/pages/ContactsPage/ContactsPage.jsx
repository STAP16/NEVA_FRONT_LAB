import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchDirections, submitApplication } from '../../api/contacts'
import { fetchProjects } from '../../api/projects'
import './ContactsPage.css'

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
}

const stagger = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

function CustomSelect({ options, value, onChange, placeholder, renderOption }) {
	const [open, setOpen] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		const handleClickOutside = e => {
			if (ref.current && !ref.current.contains(e.target)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const selectedOption = options.find(o => o.value === value)

	return (
		<div className={`contacts-select${open ? ' contacts-select--open' : ''}`} ref={ref}>
			<button
				type="button"
				className="contacts-select__trigger"
				onClick={() => setOpen(prev => !prev)}
			>
				<span className={`contacts-select__value${!value ? ' contacts-select__value--placeholder' : ''}`}>
					{selectedOption ? (renderOption ? renderOption(selectedOption) : selectedOption.label) : placeholder}
				</span>
				<svg className="contacts-select__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>
			{open && (
				<div className="contacts-select__dropdown">
					{options.map(option => (
						<button
							key={option.value}
							type="button"
							className={`contacts-select__option${option.value === value ? ' contacts-select__option--active' : ''}`}
							onClick={() => {
								onChange(option.value)
								setOpen(false)
							}}
						>
							{renderOption ? renderOption(option) : option.label}
							{option.subtitle && (
								<span className="contacts-select__option-subtitle">{option.subtitle}</span>
							)}
						</button>
					))}
					{options.length === 0 && (
						<div className="contacts-select__empty">Нет доступных вариантов</div>
					)}
				</div>
			)}
		</div>
	)
}

export function ContactsPage() {
	const [searchParams] = useSearchParams()
	const initialMode = searchParams.get('mode') === 'project' ? 'project' : 'lab'
	const initialDirection = searchParams.get('direction') || ''
	const initialProject = searchParams.get('project') || ''

	const [mode, setMode] = useState(initialMode)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [telegram, setTelegram] = useState('')
	const [direction, setDirection] = useState(initialDirection)
	const [projectId, setProjectId] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')

	const [directions, setDirections] = useState([])
	const [projects, setProjects] = useState([])
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		fetchDirections()
			.then(setDirections)
			.catch(() => {
				setDirections([
					{ id: 'ai', title: 'AI-системы' },
					{ id: 'web', title: 'Веб-разработка' },
					{ id: 'data', title: 'Аналитика данных' },
					{ id: 'design', title: 'Продуктовый дизайн' },
					{ id: 'security', title: 'Бекенд инженерия' },
					{ id: 'cloud', title: 'Cloud и DevOps' }
				])
			})

		fetchProjects()
			.then(data => setProjects(data.filter(p => p.status === 'active' && p.seats > 0)))
			.catch(() => setProjects([]))
	}, [])

	useEffect(() => {
		if (initialProject && projects.length > 0) {
			const match = projects.find(p => p.title === initialProject)
			if (match) {
				setProjectId(match.id)
			}
		}
	}, [initialProject, projects])

	const directionOptions = useMemo(
		() => directions.map(d => ({ value: d.title, label: d.title })),
		[directions]
	)

	const projectOptions = useMemo(
		() => projects.map(p => ({
			value: p.id,
			label: p.title,
			subtitle: `${p.participants} из ${p.participants + p.seats} участников`
		})),
		[projects]
	)

	const isValid = useMemo(() => {
		if (!firstName.trim() || !lastName.trim() || !telegram.trim()) return false
		if (mode === 'lab' && !direction) return false
		if (mode === 'project' && !projectId) return false
		return true
	}, [firstName, lastName, telegram, direction, projectId, mode])

	const handleSubmit = useCallback(async e => {
		e.preventDefault()
		if (!isValid || submitting) return

		setSubmitting(true)
		setError('')

		try {
			await submitApplication({
				type: mode,
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				telegram: telegram.trim(),
				direction: mode === 'lab' ? direction : undefined,
				projectId: mode === 'project' ? projectId : undefined,
				phone: phone.trim() || undefined,
				email: email.trim() || undefined
			})
			setSubmitted(true)
		} catch {
			setError('Не удалось отправить заявку. Попробуйте позже.')
		} finally {
			setSubmitting(false)
		}
	}, [isValid, submitting, mode, firstName, lastName, telegram, direction, projectId, phone, email])

	const handleModeChange = useCallback(newMode => {
		setMode(newMode)
		setError('')
	}, [])

	if (submitted) {
		return (
			<main className="contacts-page">
				<section className="contacts-hero">
					<motion.div
						className="contacts-hero__inner"
						initial="hidden"
						animate="visible"
						variants={stagger}
					>
						<motion.p className="contacts-hero__label" variants={fadeUp}>NEVA LAB</motion.p>
						<motion.h1 className="contacts-hero__title" variants={fadeUp}>Заявка отправлена</motion.h1>
						<motion.p className="contacts-hero__subtitle" variants={fadeUp}>
							Мы свяжемся с вами в ближайшее время через Telegram.
						</motion.p>
					</motion.div>
				</section>

				<motion.section
					className="contacts-success"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.4, delay: 0.2 }}
				>
					<div className="contacts-success__icon">
						<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
							<circle cx="32" cy="32" r="30" stroke="#2c5aa0" strokeWidth="2.5" />
							<path d="M20 33l8 8 16-18" stroke="#2c5aa0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<h2 className="contacts-success__title">Спасибо за заявку!</h2>
					<p className="contacts-success__text">
						Ответим в течение 24 часов в Telegram. Пока можешь изучить наши проекты и направления.
					</p>
				</motion.section>
			</main>
		)
	}

	return (
		<main className="contacts-page">
			<section className="contacts-hero">
				<motion.div
					className="contacts-hero__inner"
					initial="hidden"
					animate="visible"
					variants={stagger}
				>
					<motion.p className="contacts-hero__label" variants={fadeUp}>NEVA LAB</motion.p>
					<motion.h1 className="contacts-hero__title" variants={fadeUp}>
						Присоединяйся к команде
					</motion.h1>
					<motion.p className="contacts-hero__subtitle" variants={fadeUp}>
						Заполни форму — мы свяжемся с тобой и обсудим участие
					</motion.p>
				</motion.div>
			</section>

			<motion.section
				className="contacts-form-section"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.15 }}
			>
				<div className="contacts-card">
					<div className="contacts-tabs">
						<button
							type="button"
							className={`contacts-tabs__tab${mode === 'lab' ? ' contacts-tabs__tab--active' : ''}`}
							onClick={() => handleModeChange('lab')}
						>
							Присоединиться к лаборатории
						</button>
						<button
							type="button"
							className={`contacts-tabs__tab${mode === 'project' ? ' contacts-tabs__tab--active' : ''}`}
							onClick={() => handleModeChange('project')}
						>
							Присоединиться к проекту
						</button>
					</div>

					<form className="contacts-form" onSubmit={handleSubmit}>
						{mode === 'project' && (
							<div className="contacts-form__group contacts-form__group--full">
								<label className="contacts-form__label">Проект <span className="contacts-form__required">*</span></label>
								<CustomSelect
									options={projectOptions}
									value={projectId}
									onChange={setProjectId}
									placeholder="Выберите проект"
									renderOption={option => (
										<div className="contacts-select__project-option">
											<span>{option.label}</span>
											{option.subtitle && (
												<span className="contacts-select__project-seats">{option.subtitle}</span>
											)}
										</div>
									)}
								/>
							</div>
						)}

						<div className="contacts-form__row">
							<div className="contacts-form__group">
								<label className="contacts-form__label">Ваше имя <span className="contacts-form__required">*</span></label>
								<input
									type="text"
									className="contacts-form__input"
									placeholder="Иван"
									value={firstName}
									onChange={e => setFirstName(e.target.value)}
								/>
							</div>
							<div className="contacts-form__group">
								<label className="contacts-form__label">Ваша фамилия <span className="contacts-form__required">*</span></label>
								<input
									type="text"
									className="contacts-form__input"
									placeholder="Иванов"
									value={lastName}
									onChange={e => setLastName(e.target.value)}
								/>
							</div>
						</div>

						<div className="contacts-form__group contacts-form__group--full">
							<label className="contacts-form__label">Телеграм <span className="contacts-form__required">*</span></label>
							<input
								type="text"
								className="contacts-form__input"
								placeholder="@username"
								value={telegram}
								onChange={e => setTelegram(e.target.value)}
							/>
						</div>

						{mode === 'lab' && (
							<>
								<div className="contacts-form__group contacts-form__group--full">
									<label className="contacts-form__label">Направление <span className="contacts-form__required">*</span></label>
									<CustomSelect
										options={directionOptions}
										value={direction}
										onChange={setDirection}
										placeholder="Выберите направление"
									/>
								</div>

								<div className="contacts-form__row">
									<div className="contacts-form__group">
										<label className="contacts-form__label">Номер телефона <span className="contacts-form__optional">(опционально)</span></label>
										<input
											type="tel"
											className="contacts-form__input"
											placeholder="+7 (999) 123-45-67"
											value={phone}
											onChange={e => setPhone(e.target.value)}
										/>
									</div>
									<div className="contacts-form__group">
										<label className="contacts-form__label">Почта <span className="contacts-form__optional">(опционально)</span></label>
										<input
											type="email"
											className="contacts-form__input"
											placeholder="email@example.com"
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
									</div>
								</div>
							</>
						)}

						{error && <p className="contacts-form__error">{error}</p>}

						<button
							type="submit"
							className={`contacts-form__submit${isValid ? '' : ' contacts-form__submit--disabled'}`}
							disabled={!isValid || submitting}
						>
							{submitting ? 'Отправка...' : 'Отправить заявку'}
						</button>
					</form>
				</div>
			</motion.section>

			<motion.section
				className="contacts-info"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				<a href="mailto:hello@nevalab.ru" className="contacts-info__item">hello@nevalab.ru</a>
				<span className="contacts-info__dot" />
				<a href="https://t.me/nevalab" className="contacts-info__item" target="_blank" rel="noopener noreferrer">Telegram</a>
				<span className="contacts-info__dot" />
				<a href="https://vk.com/nevalab" className="contacts-info__item" target="_blank" rel="noopener noreferrer">VK</a>
				<span className="contacts-info__dot" />
				<a href="https://github.com/nevalab" className="contacts-info__item" target="_blank" rel="noopener noreferrer">GitHub</a>
			</motion.section>
		</main>
	)
}
