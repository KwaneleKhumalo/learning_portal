import { Router } from "express"
import { login, logout, registerForClass, signup, updateStudent, studentProfile } from "../controllers/studentsControllers.js"
import { protect } from "../middleware/authMiddleware.js"
const studentRouter = Router()

studentRouter.route("/registration/auth").post(signup)
studentRouter.route("/login/auth").post(login)
studentRouter.route("/auth/logout").post( protect, logout)
studentRouter.route("/profile/:studentId").get(protect, studentProfile).put( protect, updateStudent)
studentRouter.route('/:studentId/auth/class-registration/:courseId').post(protect, registerForClass)

export default studentRouter
