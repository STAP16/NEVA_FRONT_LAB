import bcrypt from 'bcryptjs'
import { prisma } from './db.js'
import { config } from './config.js'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function waitForDatabase() {
	for (let attempt = 1; attempt <= config.dbConnectRetries; attempt++) {
		try {
			await prisma.$queryRaw`SELECT 1`
			return
		} catch (err) {
			if (attempt === config.dbConnectRetries) {
				throw new Error(
					`Database is unavailable after ${config.dbConnectRetries} attempts. ` +
						`Check PostgreSQL and DATABASE_URL. Last error: ${err.message}`
				)
			}

			console.warn(
				`Database not ready (attempt ${attempt}/${config.dbConnectRetries}). Retrying in ${config.dbConnectRetryDelayMs}ms...`
			)
			await sleep(config.dbConnectRetryDelayMs)
		}
	}
}

export async function ensureAdminUser() {
	const existingAdmin = await prisma.admin.findUnique({
		where: { username: config.adminUsername }
	})

	if (existingAdmin) {
		return
	}

	const passwordHash = await bcrypt.hash(config.adminInitialPassword, 12)
	await prisma.admin.create({
		data: {
			username: config.adminUsername,
			passwordHash
		}
	})

	if (config.adminInitialPasswordProvided) {
		console.log(`Admin user "${config.adminUsername}" created from ADMIN_INITIAL_PASSWORD.`)
		return
	}

	console.log(`Admin user "${config.adminUsername}" created with generated one-time password:`)
	console.log(config.adminInitialPassword)
	console.log('Save this password now and change it immediately after first login.')
}
