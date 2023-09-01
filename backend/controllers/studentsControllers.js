import Student from "../models/studentModels.js"
import Course from "../models/coursesModel.js"
import genToken from "../utils/jwtAuth.js"

export const signup = async (req, res) => {
  const { firstname, lastname, email, phone, homeAddress, street, city, state, zipCode, password } = req.body

  const studentExist = await Student.findOne({ email })

  if (studentExist) {
    res.status(403).json({ msg: "A student with this email already exist. Please login." })
  }

  const student = await Student.create({
    firstname,
    lastname,
    email,
    phone,
    homeAddress,
    street,
    city,
    state,
    zipCode,
    password
  })

  if (student) {
    genToken(res, student._id)
    res.status(201).json({
      msg: "Account Created",
      data: {
        student_id: student._id,
        firstname: student.firstname,
        email: student.email,
        courses: student.registeredCourse
      }
    })
  } else {
    console.log("Issues creating a student")
    process.exit(1)
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const student = await Student.findOne({ email }).populate("registeredCourse")
  const course = student ? await Course.findById(student.registeredCourse) : "No Courses Yet."

  if (!student) {
    return res.status(401).json({
      msg: "This student doesn't exist."
    })
  } else if (student && (await student.matchPassword(password))) {
    const studentId = student._id.toString() // Convert ObjectId to string
    genToken(res, studentId) // Pass the string studentId to genToken

    res.status(200).json({
      msg: "Student Validated",
      data: { name: student.firstname, lastname: student.lastname, email: student.email, student_id: studentId },
      courses: { course }
    })
  } else {
    res.status(401).json({
      msg: "Invalid Credentials."
    })
  }
}

export const logout = async (req, res) => {
  res.cookie("auth", "", {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({
    msg: "Successfully Logged Out."
  })
}

export const registerForClass = async (req, res) => {
  const { studentId, courseId } = req.params
  try {
    const student = await Student.findById(studentId)
    const course = await Course.findById(courseId)

    if (!student || !course) {
      return res.status(404).json({ message: "Course not found." })
    }

    // Check to see if a course is registered
    const isRegistered = student.registeredCourse.some(registeredCourseId => registeredCourseId.toString() === courseId)

    if (isRegistered) {
      return res.status(400).json({ message: "Already registered for this course." })
    }

    // Add the course to the student's registeredCourses array
    student.registeredCourse.push(course)
    await student.save()

    const courseData = {
      courseId: course._id,
      courseName: course.name,
      thumbnail: course.image,
      video: course.video
    }

    res.status(200).json({ message: "Course added successfully.", courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "An error occurred while adding the course." })
  }
}

export const studentProfile = async (req, res) => {
  const student = await Student.findById(req.params.studentId)
  const course = (await Course.findById(student.registeredCourse)) || []

  const { firstname, lastname, email, phone, homeAddress, street, city, state, zipCode } = student

  const { name, video, image } = course

  if (student) {
    return res.status(200).json({
      data: {
        studentId: student._id,
        firstname,
        lastname,
        email,
        phone,
        homeAddress,
        street,
        city,
        state,
        zipCode,
        student_Since: student.createdAt,
        last_Update: student.updatedAt
      },
      courses: {
        name,
        video,
        thumbnail: image,
        last_Update: course.updatedAt
      }
    })
  } else {
    return res.status(403).json("Unauthorized")
  }
}

export const updateStudent = async (req, res) => {
  const student = await Student.findById(req.params.studentId)

  if (!student) {
    res.status(401)
    throw new Error(`Something went wrong updating user.`)
  } else {
    student.firstname = req.body.firstname || student.firstname
    student.lastname = req.body.lastname || student.lastname
    student.email = req.body.email || student.email
    student.phone = req.body.phone || student.phone
    student.homeAddress = req.body.homeAddress || student.homeAddress
    student.street = req.body.street || student.street
    student.city = req.body.city || student.city
    student.state = req.body.state || student.state
    student.zipCode = req.body.zipCode || student.zipCode

    if (req.body.password) {
      student.password = req.body.password
    }

    const updateStudent = await student.save()

    res.status(200).json({
      msg: `Account updated successfully.`,
      data: {
        firstname: updateStudent.firstname,
        lastname: updateStudent.lastname,
        email: updateStudent.email,
        phone: updateStudent.phone,
        homeAddress: updateStudent.homeAddress,
        street: updateStudent.street,
        city: updateStudent.city,
        state: updateStudent.state,
        zipCode: updateStudent.zipCode
      }
    })
  }
}
