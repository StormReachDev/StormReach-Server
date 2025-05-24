function getResetPasswordEmail(userName, resetLink) {
  return `
  <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Poppins', Arial, sans-serif;  padding: 30px;">
      <div style="max-width: 600px; margin: 30px auto; background-color: #fff; padding: 40px 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">Reset your password</h2>
        <p style="font-size: 15px; color: #555;">Hi ${userName},</p>

        <p style="font-size: 15px; color: #555; line-height: 1.6;">
          We received a request to reset your password. Click the button below to proceed. If you didn’t request this, you can safely ignore this email.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #ad1d1c; color: white; padding: 14px 28px; text-decoration: none; font-weight: 500; border-radius: 6px; display: inline-block; font-size: 20px;">
            Reset password
          </a>
        </div>
        <p style="font-size: 14px; color: #999;">This link will expire in 15 minutes for your security.</p>
        <p style="margin-top: 40px; font-size: 15px; color: #555;">Thanks,<br><strong>StormReach Team</strong></p>
      </div>
    </body>
  </html>
  `
}

function getNewPasswordEmail(userName, email, password) {
  return `
  <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Poppins', Arial, sans-serif; padding: 30px;">
      <div style="max-width: 600px; margin: 30px auto; background-color: #fff; padding: 40px 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">Welcome to StormReach!</h2>
        <p style="font-size: 15px; color: #555;">Hi ${userName},</p>

        <p style="font-size: 15px; color: #555; line-height: 1.6;">
          Your account has been created successfully using the email address:
          <strong style="color: #2c3e50;">${email}</strong>
        </p>

        <p style="font-size: 15px; color: #555; line-height: 1.6;">
          Here is your temporary password to log in:
        </p>

        <p style="font-size: 18px; font-weight: 600; color: #ad1d1c; background-color: #f9e6e6; padding: 12px 20px; border-radius: 6px; display: inline-block; letter-spacing: 2px;">
          ${password}
        </p>

        <p style="font-size: 15px; color: #555; line-height: 1.6; margin-top: 20px;">
          For your security, please change this password after your first login.
        </p>

        <p style="margin-top: 40px; font-size: 15px; color: #555;">
          Thanks,<br><strong>StormReach Team</strong>
        </p>
      </div>
    </body>
  </html>
  `
}

function getPlanPurchaseEmail(userName, planName, amount, credits) {
  return `
  <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Poppins', Arial, sans-serif; padding: 30px;">
      <div style="max-width: 600px; margin: 30px auto; background-color: #fff; padding: 40px 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">Plan Purchase Confirmation</h2>
        <p style="font-size: 15px; color: #555;">Hi ${userName},</p>

        <p style="font-size: 15px; color: #555; line-height: 1.6;">
          Thank you for your purchase! Here are your plan details:
        </p>

        <div style="margin: 20px 0;">
          <p style="font-size: 15px; color: #555;"><strong>Plan Name:</strong> ${planName}</p>
          <p style="font-size: 15px; color: #555;"><strong>Amount Paid:</strong> $${amount.toFixed(2)}</p>
          <p style="font-size: 15px; color: #555;"><strong>Total Appointment Credits:</strong> ${credits}</p>
        </div>

        <p style="font-size: 15px; color: #555; line-height: 1.6;">
          Your credits have been added to your account and are available for use immediately.
        </p>

        <p style="margin-top: 40px; font-size: 15px; color: #555;">
          If you have any questions or need help, feel free to reach out to our support team.
        </p>

        <p style="margin-top: 40px; font-size: 15px; color: #555;">
          Thanks,<br><strong>StormReach Team</strong>
        </p>
      </div>
    </body>
  </html>
  `
}

export default getResetPasswordEmail
export { getNewPasswordEmail, getPlanPurchaseEmail }
