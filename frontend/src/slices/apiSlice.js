import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/endpoints'

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Student', 'Course'],
  endpoints: (builder) => ({})
})