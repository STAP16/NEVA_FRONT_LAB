import express from 'express'
import cors from 'cors'
import { config } from './config.js'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', publicRoutes)
app.use('/api/admin', adminRoutes)

app.use(errorHandler)

app.listen(config.port, () => {
	console.log(`Server running on http://localhost:${config.port}`)
})
