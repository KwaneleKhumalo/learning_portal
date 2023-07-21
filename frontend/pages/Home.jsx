import { useEffect, useState } from "react";
import { useGetCourseQuery } from "../src/slices/coursesApiSlice"

const Home = () => {

  const { data: courses, isLoading, isError } = useGetCourseQuery();
  const [courseData, setCourseData] = useState("")

  const getData = async () => {
    isLoading ? "Loading" : setCourseData(courses.data)
  }

  useEffect(() => {
    getData()
  }, [isLoading])


  return (
    <div className="text-center py-5">
      {isLoading ? "Data Loading" : isError ? " There was an error" : 
        <>
          <h1>Courses: {  }</h1>
        </>
}
    </div>
  )
}

export default Home
