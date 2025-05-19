// Imports:
import express from 'express'
import dotenv from 'dotenv'
import initializeAppModules from './start/index.js'

// Instantiation:
const app = express()

// Configuration:
if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({
    path: '/config/config.env',
  })
}

// Initialize app modules:
initializeAppModules(app)

export default app
