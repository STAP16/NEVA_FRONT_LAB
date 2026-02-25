import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const projectIncludes = {
	timeline: { orderBy: { sortOrder: 'asc' } },
	tasks: { orderBy: { sortOrder: 'asc' } },
	mentors: { orderBy: { sortOrder: 'asc' } },
	members: { orderBy: { sortOrder: 'asc' } },
	feedback: { orderBy: { createdAt: 'asc' } }
}
