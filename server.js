// Imports:
import http from 'http'
import app from './app.js'
import initializeDatabase from './config/database.js'

// Instantiation:
const server = http.createServer(app)
const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || 'development'

// Handling uncaught exceptions:
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception!')
  console.error(`💥 Reason: ${err.message}`)
  process.exit(1)
})

// Database connection:
initializeDatabase.connect()

// Server listening:
const initializeServer = server.listen(PORT, () => {
  console.log(`🚀 Server is running in ${ENV} mode on http://localhost:${PORT}`)
})

// Unhandled promise rejections:
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection!')
  console.error(`💥 Reason: ${err.message}`)
  initializeServer.close(() => process.exit(1))
})
