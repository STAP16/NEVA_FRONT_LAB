import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './JoinSuccessPage.css'

export function JoinSuccessPage() {
	const navigate = useNavigate()
	const [isLeaving, setIsLeaving] = useState(false)

	const handleBackToProjects = () => {
		if (isLeaving) {
			return
		}

		setIsLeaving(true)
		window.setTimeout(() => {
			navigate('/projects', { state: { fromSuccessBack: true } })
		}, 440)
	}

	return (
		<main className={`join-success-page${isLeaving ? ' join-success-page--leaving' : ''}`}>
			<p>вы успешно присоединились к проекту</p>
			<button type="button" className="join-success-page__back" onClick={handleBackToProjects}>
				Вернуться к проектам
			</button>

			<AnimatePresence>
				{isLeaving && (
					<motion.div
						className="join-success-transition"
						initial={{ opacity: 0, backdropFilter: 'blur(0px)', backgroundColor: 'rgba(16, 35, 64, 0)' }}
						animate={{ opacity: 1, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(16, 35, 64, 0.2)' }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.42, ease: [0.25, 0.7, 0.2, 1] }}
					/>
				)}
			</AnimatePresence>
		</main>
	)
}
