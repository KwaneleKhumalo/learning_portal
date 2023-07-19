import mongoose from "mongoose";
const Schema = mongoose.Schema;


const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    unique: true
  },
  video: {
    type: String,
    required: true,
    unique: true
  }
}, {timestamps: true})

const Course = mongoose.model("Course", courseSchema)

export default Course;