export default function setAuthToken(user, statusCode, res) {
  const token = user.generateJsonWebToken();

  if (!token) {
    return res.status(500).json({
      success: false,
      message:
        'Something went wrong while creating your session. Please try again.',
    });
  }

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
}
