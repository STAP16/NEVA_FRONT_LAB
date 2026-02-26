const STORAGE_KEY = 'neva-lab-applications'
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || ''

function buildApplicationLabel(application) {
	if (application.type === 'lab') {
		return `Лаборатория: ${application.direction || '—'}`
	}
	return `Проект: ${application.projectTitle || application.projectId || '—'}`
}

function buildTelegramText(application) {
	return (
		`<b>Новая заявка #${application.id}</b>\n` +
		`${application.firstName} ${application.lastName}\n` +
		`Telegram: ${application.telegram}\n` +
		`Тип: ${buildApplicationLabel(application)}` +
		(application.phone ? `\nТелефон: ${application.phone}` : '') +
		(application.email ? `\nПочта: ${application.email}` : '')
	)
}

async function sendTelegramNotification(application) {
	if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
		return
	}

	const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: TELEGRAM_CHAT_ID,
			text: buildTelegramText(application),
			parse_mode: 'HTML'
		})
	})

	if (!response.ok) {
		throw new Error('Failed to send Telegram notification')
	}
}

export async function submitApplication(data) {
	const nextItem = {
		...data,
		id: `app-${Date.now()}`,
		createdAt: new Date().toISOString()
	}

	try {
		const currentRaw = window.localStorage.getItem(STORAGE_KEY)
		const current = currentRaw ? JSON.parse(currentRaw) : []
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify([nextItem, ...current]))
	} catch {
		// Ignore storage errors to keep UX flow working in private mode/restricted browsers.
	}

	void sendTelegramNotification(nextItem).catch(() => {
	// Keep the form optimistic: notification errors must not block user flow.
})
	await new Promise(resolve => window.setTimeout(resolve, 350))
	return { ok: true, application: nextItem }
}
