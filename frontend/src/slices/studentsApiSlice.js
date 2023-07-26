import { LOGIN_URL, LOGOUT_URL } from "../../utils/endpoints"
import { apiSlice } from "./apiSlice"

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN_URL,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT_URL,
        method: "POST",
      })
    })
  })
})

export const { useLoginMutation, useLogoutMutation } = studentApiSlice
