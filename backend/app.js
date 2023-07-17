import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from 'cors'
import courseRouter from "./routes/courseRoute.js"
import studentRouter from "./routes/studentRoutes.js"
import { connectToDb } from "./utils/dbConnection.js"
const PORT = 8080

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get("/", (req, res) => {
  res.json({
    msg: "Hello World",
    status: "200"
  })
})

app.use("/api/v1/courses", courseRouter)
app.use("/api/v1/student", studentRouter)


// Connect to Db and then run the App Server. Server won't run without the db connection. 
connectToDb(app, PORT)


