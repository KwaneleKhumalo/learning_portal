import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SideNav from "../components/SideNav"

const Dashboard = () => {
  const { userInfo } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get("redirect") || "/login"

  useEffect(() => {
    if (!userInfo) {
      navigate(redirect)
      toast.warning(`You're logged Out.`)
    }
  }, [userInfo, redirect, navigate])

  return (
    <>
      <SideNav />
      <h1 className="text-center mt-5">Hello, {userInfo.data.name }</h1>
    </> 
  )
}

export default Dashboard
