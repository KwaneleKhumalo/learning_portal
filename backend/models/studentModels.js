import bcrypt from "bcryptjs"
import mongoose from "mongoose"
const Schema = mongoose.Schema

const studentSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true
    },
    lastname: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      match:[/.+\@.+\..+/, "Please fill a valid email address"],
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    homeAddress: {
      type: Number
    },
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: Number
    },
    password: {
      type: String,
      required: true
    },
    registeredCourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  },
  { timestamps: true }
)

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

studentSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password)
}

const Student = mongoose.model("Student", studentSchema)

export default Student
