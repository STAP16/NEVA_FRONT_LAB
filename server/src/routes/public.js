import { Router } from 'express'
import { prisma } from '../db.js'
import { serializeProject, serializeProjectList } from '../serializers/projectSerializer.js'
import { sendTelegramNotification } from '../utils/telegram.js'

const router = Router()

router.get('/projects', async (req, res) => {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { sortOrder: 'asc' }
		})
		res.json(serializeProjectList(projects))
	} catch (err) {
		console.error('GET /projects error:', err.message)
		res.status(500).json({ error: 'Failed to fetch projects' })
	}
})

router.get('/projects/:id', async (req, res) => {
	try {
		const project = await prisma.project.findUnique({
			where: { id: req.params.id }
		})
		if (!project) {
			return res.status(404).json({ error: 'Project not found' })
		}
		res.json(serializeProject(project))
	} catch (err) {
		console.error('GET /projects/:id error:', err.message)
		res.status(500).json({ error: 'Failed to fetch project' })
	}
})

const DIRECTIONS = [
	{ id: 'ai', title: 'AI-системы' },
	{ id: 'web', title: 'Веб-разработка' },
	{ id: 'data', title: 'Аналитика данных' },
	{ id: 'design', title: 'Продуктовый дизайн' },
	{ id: 'security', title: 'Бекенд инженерия' },
	{ id: 'cloud', title: 'Cloud и DevOps' }
]

router.get('/directions', (req, res) => {
	res.json(DIRECTIONS)
})

router.post('/applications', async (req, res) => {
	try {
		const { type, firstName, lastName, telegram, direction, projectId, phone, email } = req.body

		if (!type || !firstName || !lastName || !telegram) {
			return res.status(400).json({ error: 'type, firstName, lastName and telegram are required' })
		}

		if (type === 'lab' && !direction) {
			return res.status(400).json({ error: 'direction is required for lab applications' })
		}

		if (type === 'project' && !projectId) {
			return res.status(400).json({ error: 'projectId is required for project applications' })
		}

		const application = await prisma.application.create({
			data: {
				type,
				firstName,
				lastName,
				telegram,
				direction: direction || null,
				projectId: projectId || null,
				phone: phone || null,
				email: email || null
			}
		})

		const label = type === 'lab' ? `Лаборатория: ${direction}` : `Проект: ${projectId}`
		sendTelegramNotification(
			`<b>Новая заявка #${application.id}</b>\n` +
			`${firstName} ${lastName}\n` +
			`Telegram: ${telegram}\n` +
			`Тип: ${label}` +
			(phone ? `\nТелефон: ${phone}` : '') +
			(email ? `\nПочта: ${email}` : '')
		)

		res.status(201).json({ success: true, id: application.id })
	} catch (err) {
		console.error('POST /applications error:', err.message)
		res.status(500).json({ error: 'Failed to submit application' })
	}
})

export default router
