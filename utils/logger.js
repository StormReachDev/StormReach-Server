// Imports:
import path from 'path'
import { fileURLToPath } from 'url'
import winston from 'winston'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function logger(level, message) {
  return winston
    .createLogger({
      level,
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({
          filename: path.join(__dirname, '..', 'logs', `${level}.log`),
        }),
      ],
    })
    .log({
      level,
      message,
    })
}

export default logger
