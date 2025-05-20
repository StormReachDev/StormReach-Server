// Imports:
import nodeMailer from 'nodemailer'
import getResetPasswordEmail from '../constants/templates/email/index.js'

async function emailService(options) {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  })
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: getResetPasswordEmail(options.name, options.resetPasswordUrl),
  }

  await transporter.sendMail(mailOptions)
}

export default emailService
