import { Router } from 'express' 
import { UpdateCourse, deleteCourse, getCourseById, getCourseList, newCourse } from "../controllers/courseController.js" 
const courseRouter = Router();

courseRouter.get("/", getCourseList);
courseRouter.route('/:courseId').get(getCourseById).put(UpdateCourse).delete(deleteCourse)
courseRouter.route('/new-course').post(newCourse);

export default courseRouter;
