// Imports:
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

// Instantiation:
const app = express()

// Configuration:
if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({
    path: '/config/config.env',
  })
}

// Middlewares:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

export default app
