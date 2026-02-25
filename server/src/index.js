import express from 'express'
import cors from 'cors'
import { config } from './config.js'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'
import { errorHandler } from './middleware/errorHandler.js'
import { ensureAdminUser, waitForDatabase } from './bootstrapAdmin.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', publicRoutes)
app.use('/api/admin', adminRoutes)

app.use(errorHandler)

async function start() {
	await waitForDatabase()
	await ensureAdminUser()

	app.listen(config.port, () => {
		console.log(`Server running on http://localhost:${config.port} (${config.nodeEnv})`)
	})
}

start().catch(err => {
	console.error('Failed to start server:', err)
	process.exit(1)
})
