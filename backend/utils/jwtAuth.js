import jwt from "jsonwebtoken"

// Create Token

const genToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  })

  res.cookie("auth", token, {
    httpOnly: true,
    secure: false,
    secure: process.env.ENVIRONMENT !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}

export default genToken
