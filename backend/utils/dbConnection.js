import mongoose from "mongoose"

export const connectToDb = async (app, port) => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    if (connection) {
      app.listen(port, () => console.log(`connected and running on ${port}`))
    } else {
      console.log("Not connected to db. App Not running!")
      process.exit(1)
    }
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}
