import { COURSE_URL } from "../../utils/endpoints";
import { apiSlice } from "./apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: () => ({
        url: COURSE_URL,
      }),
      keepUnusedDataFor: 5
    })
  })
})

export const { useGetCourseQuery } = courseApiSlice;