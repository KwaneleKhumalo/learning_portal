import jwt from 'jsonwebtoken'

// Create Token

export const genToken = async (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: "30d"
  })

  res.cookie("authentication", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
  })
}