// Structure
import Course from "../models/coursesModel.js"

export const newCourse = async (req, res) => {
  const { name, image, video } = req.body

  const courseExists = await Course.findOne({ name, image, video })

  if (courseExists) {
    res.status(403)
    throw new Error( "A course with this name already exists. ")
  }

  const course = await Course.create({
    name,
    image,
    video
  })

  if (course) {
    res.status(200).json({
      msg: "New Course Added Successfully",
      data: {
        courseName: course.name,
        courseID: course._id
      }
    })
  } else {
    res.status(403).json({
      msg: "Failed to create a course."
    })
    process.exit(1)
  }
}

// Public
export const getCourseList = async (req, res) => {
  const course = (await Course.find());

  if (course) {
    res.status(200).json({
      msg: "List of available courses",
      data: course
    })
  } else {
    res.status(401).json({
      msg: "No courses available at the moment."
    })
  }

  
}

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.courseId)

  if (!course) {
    return res.status(404).json({ msg: "Course not found" })
  }

  res.status(200).json({ msg: "Course By Id", course })
}

export const UpdateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ msg: "This course doesn't exist." })
    }

    course.name = req.body.name || course.name
    course.image = req.body.image || course.image
    course.video = req.body.video || course.video

    const updatedCourse = await course.save()

    res.status(201).json({
      data: updatedCourse,
      msg: "Course updated successfully."
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "An error occurred while updating the course." })
  }
}

export const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId)

  if (!course) {
    res.status(404).json({
      msg: "Course Not found"
    })
  }
  course.deleteOne();

  res.status(201).json({
    msg: "Course Removed!"
  })
}
