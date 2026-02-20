import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { logger } from './utils/logger.js'
import errorExplainerRouter from './routes/errorExplainer.js'
import logAnalyzerRouter from './routes/logAnalyzer.js'
import apiCheckerRouter from './routes/apiChecker.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.json({ limit: '5mb' }))

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/errors', errorExplainerRouter)
app.use('/api/logs', logAnalyzerRouter)
app.use('/api/check', apiCheckerRouter)

// Error handler
app.use((err, req, res, _next) => {
  logger.error(err.message, { stack: err.stack })
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  })
})

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
