import jwt from "jsonwebtoken";
import Student from "../models/studentModels.js";

export const protect = async (req, res, next) => {
  let token = req.cookies.auth;

  if (token) {
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.student = await Student.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      res.status(401).json({
        msg: "Not Authorized. Session Expired."
      })
    }
  } else {
    res.status(401).json({
      msg: "Unauthorized!"
    })
  }


}