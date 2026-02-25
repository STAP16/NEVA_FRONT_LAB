import { Router } from 'express'
import { prisma, projectIncludes } from '../db.js'
import { serializeProject, serializeProjectList } from '../serializers/projectSerializer.js'

const router = Router()

router.get('/projects', async (req, res) => {
	try {
		const projects = await prisma.project.findMany({
			include: projectIncludes,
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
			where: { id: req.params.id },
			include: projectIncludes
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

router.post('/projects/:id/feedback', async (req, res) => {
	try {
		const { author, role, text } = req.body
		if (!author || !text) {
			return res.status(400).json({ error: 'author and text are required' })
		}

		const project = await prisma.project.findUnique({ where: { id: req.params.id } })
		if (!project) {
			return res.status(404).json({ error: 'Project not found' })
		}

		const time = new Date().toLocaleString('ru-RU', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		})

		const feedback = await prisma.feedback.create({
			data: {
				projectId: req.params.id,
				author,
				role: role || 'Наблюдатель проекта',
				text,
				time
			}
		})

		res.status(201).json({
			id: feedback.id,
			author: feedback.author,
			role: feedback.role,
			text: feedback.text,
			time: feedback.time
		})
	} catch (err) {
		console.error('POST /projects/:id/feedback error:', err.message)
		res.status(500).json({ error: 'Failed to submit feedback' })
	}
})

router.post('/projects/:id/join', async (req, res) => {
	try {
		// Атомарный UPDATE: обновляем только если seats > 0
		const updated = await prisma.$queryRaw`
			UPDATE "Project"
			SET seats = seats - 1, participants = participants + 1, "updatedAt" = NOW()
			WHERE id = ${req.params.id} AND seats > 0
			RETURNING id
		`

		if (!updated || updated.length === 0) {
			const project = await prisma.project.findUnique({ where: { id: req.params.id } })
			if (!project) {
				return res.status(404).json({ error: 'Project not found' })
			}
			return res.status(400).json({ error: 'No seats available' })
		}

		res.json({ success: true })
	} catch (err) {
		console.error('POST /projects/:id/join error:', err.message)
		res.status(500).json({ error: 'Failed to join project' })
	}
})

export default router
