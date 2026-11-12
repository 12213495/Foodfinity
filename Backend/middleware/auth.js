import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  const headerToken =
    req.headers.token ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null)

  if (!headerToken) {
    return res.status(401).json({ success: false, message: "Not authorized, login again" })
  }

  try {
    const decoded = jwt.verify(headerToken, process.env.JWT_SECRET)
    req.body = req.body || {}
    req.body.userId = decoded.id
    next()
  } catch (error) {
    console.log("JWT error:", error.message)
    res.status(401).json({ success: false, message: "Invalid token" })
  }
}

export default authMiddleware