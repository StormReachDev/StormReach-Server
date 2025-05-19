// Imports:
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import globalErrorHandler from './middlewares/error.js'

// Instantiation:
const app = express()

// Configuration:
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: '/config/config.env',
  })
}

// Middlewares:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// TODO: Routes come here.

// Error handling middleware:
app.use(globalErrorHandler)

export default app
