export default function setAuthToken(user, statusCode, res) {
  const token = user.generateJsonWebToken()

  if (!token) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating your session. Please try again.',
    })
  }

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user,
  })
}
