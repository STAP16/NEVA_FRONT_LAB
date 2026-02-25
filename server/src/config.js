import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '..', '.env') })

export const config = {
	port: parseInt(process.env.PORT || '3001', 10),
	databaseUrl: process.env.DATABASE_URL,
	jwtSecret: process.env.JWT_SECRET || 'fallback-secret',
	adminUsername: process.env.ADMIN_USERNAME || 'admin',
	adminPassword: process.env.ADMIN_PASSWORD || 'admin123'
}
