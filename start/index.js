// Imports:
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

export default function initializeAppModules(app) {
  // Middlewares:
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(cors())
}
