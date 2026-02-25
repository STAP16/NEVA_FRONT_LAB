import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { config } from '../config.js'
import { prisma, projectIncludes } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

const VALID_SORT_FIELDS = new Set(['sortOrder', 'title', 'category', 'progress', 'status', 'deadline', 'participants', 'seats'])

// --- Auth ---

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body
		if (!username || !password) {
			return res.status(400).json({ error: 'username and password required' })
		}

		const admin = await prisma.admin.findUnique({ where: { username } })
		if (!admin) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}

		const valid = await bcrypt.compare(password, admin.passwordHash)
		if (!valid) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}

		const token = jwt.sign({ id: admin.id, username: admin.username }, config.jwtSecret, { expiresIn: '24h' })
		res.json({ token, username: admin.username })
	} catch (err) {
		console.error('POST /login error:', err.message)
		res.status(500).json({ error: 'Login failed' })
	}
})

router.get('/me', requireAdmin, (req, res) => {
	res.json({ id: req.admin.id, username: req.admin.username })
})

// --- Projects CRUD ---

function pickProjectFields(body) {
	const allowed = ['title', 'category', 'categoryKey', 'summary', 'stage', 'progress', 'progressDone', 'progressInProgress', 'progressUpcoming', 'participants', 'deadline', 'completionDateText', 'seats', 'status', 'resultsUrl', 'joinUrl', 'sortOrder']
	const data = {}
	for (const key of allowed) {
		if (body[key] !== undefined) {
			data[key] = body[key]
		}
	}
	return data
}

router.get('/projects', requireAdmin, async (req, res) => {
	try {
		const { _sort = 'sortOrder', _order = 'ASC', _start, _end, q } = req.query

		const where = q
			? { OR: [{ title: { contains: q, mode: 'insensitive' } }, { summary: { contains: q, mode: 'insensitive' } }] }
			: {}

		const total = await prisma.project.count({ where })

		const sortField = VALID_SORT_FIELDS.has(_sort) ? _sort : 'sortOrder'
		const orderBy = { [sortField]: _order.toLowerCase() === 'desc' ? 'desc' : 'asc' }
		const skip = _start ? parseInt(_start, 10) : undefined
		const take = _start && _end ? parseInt(_end, 10) - parseInt(_start, 10) : undefined

		const projects = await prisma.project.findMany({
			where,
			include: projectIncludes,
			orderBy,
			skip,
			take
		})

		res.set('X-Total-Count', String(total))
		res.set('Access-Control-Expose-Headers', 'X-Total-Count')
		res.json(projects)
	} catch (err) {
		console.error('GET /admin/projects error:', err.message)
		res.status(500).json({ error: 'Failed to fetch projects' })
	}
})

router.get('/projects/:id', requireAdmin, async (req, res) => {
	try {
		const project = await prisma.project.findUnique({
			where: { id: req.params.id },
			include: projectIncludes
		})
		if (!project) {
			return res.status(404).json({ error: 'Not found' })
		}
		res.json(project)
	} catch (err) {
		console.error('GET /admin/projects/:id error:', err.message)
		res.status(500).json({ error: 'Failed to fetch project' })
	}
})

router.post('/projects', requireAdmin, async (req, res) => {
	try {
		const data = pickProjectFields(req.body)
		data.id = req.body.id

		if (!data.id || !data.title) {
			return res.status(400).json({ error: 'id and title are required' })
		}

		data.stage = data.stage || ''
		data.progress = data.progress || 0
		data.progressDone = data.progressDone || 0
		data.progressInProgress = data.progressInProgress || 0
		data.progressUpcoming = data.progressUpcoming || 0
		data.participants = data.participants || 0
		data.deadline = data.deadline || ''
		data.completionDateText = data.completionDateText || ''
		data.seats = data.seats || 0
		data.status = data.status || 'active'
		data.sortOrder = data.sortOrder || 0

		const project = await prisma.project.create({
			data,
			include: projectIncludes
		})
		res.status(201).json(project)
	} catch (err) {
		console.error('POST /admin/projects error:', err.message)
		res.status(500).json({ error: 'Failed to create project' })
	}
})

router.put('/projects/:id', requireAdmin, async (req, res) => {
	try {
		const data = pickProjectFields(req.body)

		if (Object.keys(data).length === 0) {
			return res.status(400).json({ error: 'No valid fields to update' })
		}

		const project = await prisma.project.update({
			where: { id: req.params.id },
			data,
			include: projectIncludes
		})
		res.json(project)
	} catch (err) {
		if (err.code === 'P2025') {
			return res.status(404).json({ error: 'Project not found' })
		}
		console.error('PUT /admin/projects/:id error:', err.message)
		res.status(500).json({ error: 'Failed to update project' })
	}
})

router.delete('/projects/:id', requireAdmin, async (req, res) => {
	try {
		await prisma.project.delete({ where: { id: req.params.id } })
		res.json({ success: true })
	} catch (err) {
		if (err.code === 'P2025') {
			return res.status(404).json({ error: 'Project not found' })
		}
		console.error('DELETE /admin/projects/:id error:', err.message)
		res.status(500).json({ error: 'Failed to delete project' })
	}
})

// --- Timeline ---

function pickTimelineFields(body) {
	const data = {}
	if (body.name !== undefined) data.name = body.name
	if (body.dates !== undefined) data.dates = body.dates
	if (body.state !== undefined) data.state = body.state
	if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder
	return data
}

router.post('/projects/:projectId/timeline', requireAdmin, async (req, res) => {
	try {
		const fields = pickTimelineFields(req.body)
		fields.projectId = req.params.projectId
		fields.sortOrder = fields.sortOrder || 0
		const item = await prisma.timelineItem.create({ data: fields })
		res.status(201).json(item)
	} catch (err) {
		console.error('POST timeline error:', err.message)
		res.status(500).json({ error: 'Failed to create timeline item' })
	}
})

router.put('/timeline/:id', requireAdmin, async (req, res) => {
	try {
		const fields = pickTimelineFields(req.body)
		const item = await prisma.timelineItem.update({
			where: { id: parseInt(req.params.id, 10) },
			data: fields
		})
		res.json(item)
	} catch (err) {
		if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' })
		console.error('PUT timeline error:', err.message)
		res.status(500).json({ error: 'Failed to update timeline item' })
	}
})

router.delete('/timeline/:id', requireAdmin, async (req, res) => {
	try {
		await prisma.timelineItem.delete({ where: { id: parseInt(req.params.id, 10) } })
		res.json({ success: true })
	} catch (err) {
		if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' })
		console.error('DELETE timeline error:', err.message)
		res.status(500).json({ error: 'Failed to delete timeline item' })
	}
})

// --- Tasks ---

function pickTaskFields(body) {
	const data = {}
	if (body.taskKey !== undefined) data.taskKey = body.taskKey
	if (body.groupKey !== undefined) data.groupKey = body.groupKey
	if (body.title !== undefined) data.title = body.title
	if (body.timeLabel !== undefined) data.timeLabel = body.timeLabel
	if (body.owner !== undefined) data.owner = body.owner
	if (body.resources !== undefined) data.resources = body.resources
	if (body.stagesDone !== undefined) data.stagesDone = body.stagesDone
	if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder
	return data
}

router.post('/projects/:projectId/tasks', requireAdmin, async (req, res) => {
	try {
		const fields = pickTaskFields(req.body)
		fields.projectId = req.params.projectId
		fields.taskKey = fields.taskKey || ''
		fields.timeLabel = fields.timeLabel || ''
		fields.owner = fields.owner || ''
		fields.resources = fields.resources || []
		fields.stagesDone = fields.stagesDone || []
		fields.sortOrder = fields.sortOrder || 0
		const task = await prisma.task.create({ data: fields })
		res.status(201).json(task)
	} catch (err) {
		console.error('POST task error:', err.message)
		res.status(500).json({ error: 'Failed to create task' })
	}
})

router.put('/tasks/:id', requireAdmin, async (req, res) => {
	try {
		const fields = pickTaskFields(req.body)
		const task = await prisma.task.update({
			where: { id: parseInt(req.params.id, 10) },
			data: fields
		})
		res.json(task)
	} catch (err) {
		if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' })
		console.error('PUT task error:', err.message)
		res.status(500).json({ error: 'Failed to update task' })
	}
})

router.delete('/tasks/:id', requireAdmin, async (req, res) => {
	try {
		await prisma.task.delete({ where: { id: parseInt(req.params.id, 10) } })
		res.json({ success: true })
	} catch (err) {
		if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' })
		console.error('DELETE task error:', err.message)
		res.status(500).json({ error: 'Failed to delete task' })
	}
})

// --- Mentors ---

function pickMentorFields(body) {
	const data = {}
	if (body.name !== undefined) data.name = body.name
	if (body.specialization !== undefined) data.specialization = body.specialization
	if (body.role !== undefined) data.role = body.role
	if (body.avatarColor !== undefined) data.avatarColor = body.avatarColor
	if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder
	return data
}

router.post('/projects/:projectId/mentors', requireAdmin, async (req, res) => {
	try {
		const fields = pickMentorFields(req.body)
		fields.projectId = req.params.projectId
		fields.specialization = fields.specialization || ''
		fields.role = fields.role || ''
		fields.avatarColor = fields.avatarColor || '#3f6fb3'
		fields.sortOrder = fields.sortOrder || 0
		const mentor = await prisma.mentor.create({ data: fields })
		res.status(201).json(mentor)
	} catch (err) {
		console.error('POST mentor error:', err.message)
		res.status(500).json({ error: 'Failed to create mentor' })
	}
})

router.put('/mentors/:id', requireAdmin, async (req, res) => {
	try {
		const fields = pickMentorFields(req.body)
		const mentor = await prisma.mentor.update({
			where: { id: parseInt(req.params.id, 10) },
			data: fields
		})
		res.json(mentor)
	} catch (err) {
		if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' })
		console.error('PUT mentor error:', err.message)
		res.status(500).json({ error: 'Failed to update mentor' })
	}
})

router.delete('/mentors/:id', requireAdmin, async (req, res) => {
	try {
		await prisma.mentor.delete({ where: { id: parseInt(req.params.id, 10) } })
		res.json({ success: true })
	} catch (err) {
		if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' })
		console.error('DELETE mentor error:', err.message)
		res.status(500).json({ error: 'Failed to delete mentor' })
	}
})

// --- Members ---

function pickMemberFields(body) {
	const data = {}
	if (body.name !== undefined) data.name = body.name
	if (body.role !== undefined) data.role = body.role
	if (body.activity !== undefined) data.activity = body.activity
	if (body.progress !== undefined) data.progress = body.progress
	if (body.history !== undefined) data.history = body.history
	if (body.avatarColor !== undefined) data.avatarColor = body.avatarColor
	if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder
	return data
}

router.post('/projects/:projectId/members', requireAdmin, async (req, res) => {
	try {
		const fields = pickMemberFields(req.body)
		fields.projectId = req.params.projectId
		fields.role = fields.role || ''
		fields.activity = fields.activity || ''
		fields.progress = fields.progress || 0
		fields.history = fields.history || []
		fields.avatarColor = fields.avatarColor || '#4b7ac0'
		fields.sortOrder = fields.sortOrder || 0
		const member = await prisma.member.create({ data: fields })
		res.status(201).json(member)
	} catch (err) {
		console.error('POST member error:', err.message)
		res.status(500).json({ error: 'Failed to create member' })
	}
})

router.put('/members/:id', requireAdmin, async (req, res) => {
	try {
		const fields = pickMemberFields(req.body)
		const member = await prisma.member.update({
			where: { id: parseInt(req.params.id, 10) },
			data: fields
		})
		res.json(member)
	} catch (err) {
		if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' })
		console.error('PUT member error:', err.message)
		res.status(500).json({ error: 'Failed to update member' })
	}
})

router.delete('/members/:id', requireAdmin, async (req, res) => {
	try {
		await prisma.member.delete({ where: { id: parseInt(req.params.id, 10) } })
		res.json({ success: true })
	} catch (err) {
		if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' })
		console.error('DELETE member error:', err.message)
		res.status(500).json({ error: 'Failed to delete member' })
	}
})

// --- Feedback ---

router.get('/projects/:projectId/feedback', requireAdmin, async (req, res) => {
	try {
		const feedback = await prisma.feedback.findMany({
			where: { projectId: req.params.projectId },
			orderBy: { createdAt: 'asc' }
		})
		res.json(feedback)
	} catch (err) {
		console.error('GET feedback error:', err.message)
		res.status(500).json({ error: 'Failed to fetch feedback' })
	}
})

router.delete('/feedback/:id', requireAdmin, async (req, res) => {
	try {
		await prisma.feedback.delete({ where: { id: parseInt(req.params.id, 10) } })
		res.json({ success: true })
	} catch (err) {
		if (err.code === 'P2025') return res.status(404).json({ error: 'Not found' })
		console.error('DELETE feedback error:', err.message)
		res.status(500).json({ error: 'Failed to delete feedback' })
	}
})

export default router
