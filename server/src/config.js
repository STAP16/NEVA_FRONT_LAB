import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import crypto from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '..', '.env') })

const jwtSecret = process.env.JWT_SECRET

if (!jwtSecret || jwtSecret.length < 32) {
	throw new Error(
		'JWT_SECRET is missing or too short. Generate a secure value (64+ chars), for example: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"'
	)
}

export const config = {
	port: parseInt(process.env.PORT || '3001', 10),
	nodeEnv: process.env.NODE_ENV || 'development',
	databaseUrl: process.env.DATABASE_URL,
	jwtSecret,
	adminUsername: process.env.ADMIN_USERNAME || 'admin',
	adminInitialPassword: process.env.ADMIN_INITIAL_PASSWORD || crypto.randomBytes(18).toString('base64url'),
	adminInitialPasswordProvided: Boolean(process.env.ADMIN_INITIAL_PASSWORD),
	dbConnectRetries: parseInt(process.env.DB_CONNECT_RETRIES || '15', 10),
	dbConnectRetryDelayMs: parseInt(process.env.DB_CONNECT_RETRY_DELAY_MS || '2000', 10)
}
