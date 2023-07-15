import { Router } from "express"
import { login, logout, registerForClass, signup, updateStudent, studentProfile } from "../controllers/studentsControllers.js"
const studentRouter = Router()

studentRouter.route("/registration/auth").post(signup)
studentRouter.route("/login/auth").post(login)
studentRouter.route("/auth/logout").post(logout)
studentRouter.route("/profile/:studentId").get(studentProfile).put(updateStudent)
studentRouter.route('/:studentId/auth/class-registration/:courseId').post(registerForClass)

export default studentRouter
