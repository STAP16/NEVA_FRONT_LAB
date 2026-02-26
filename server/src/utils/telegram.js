import { config } from '../config.js'

export function sendTelegramNotification(text) {
	const { telegramBotToken, telegramChatId } = config
	if (!telegramBotToken || !telegramChatId) return

	const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

	fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: telegramChatId,
			text,
			parse_mode: 'HTML'
		})
	}).catch(err => console.error('Telegram notify error:', err.message))
}
