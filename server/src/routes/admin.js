import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { config } from '../config.js'
import { prisma } from '../db.js'
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
	const allowed = ['title', 'description', 'category', 'categoryKey', 'participants', 'mentor', 'deadline', 'recruitmentDate', 'progress', 'seats', 'status', 'sortOrder']
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
			? { OR: [{ title: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }] }
			: {}

		const total = await prisma.project.count({ where })

		const sortField = VALID_SORT_FIELDS.has(_sort) ? _sort : 'sortOrder'
		const orderBy = { [sortField]: _order.toLowerCase() === 'desc' ? 'desc' : 'asc' }
		const skip = _start ? parseInt(_start, 10) : undefined
		const take = _start && _end ? parseInt(_end, 10) - parseInt(_start, 10) : undefined

		const projects = await prisma.project.findMany({
			where,
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
			where: { id: req.params.id }
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

		data.description = data.description || ''
		data.category = data.category || ''
		data.categoryKey = data.categoryKey || ''
		data.participants = data.participants || 0
		data.mentor = data.mentor || ''
		data.deadline = data.deadline || ''
		data.recruitmentDate = data.recruitmentDate || ''
		data.progress = data.progress || 0
		data.seats = data.seats || 0
		data.status = data.status || 'active'
		data.sortOrder = data.sortOrder || 0

		const project = await prisma.project.create({ data })
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
			data
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

export default router
