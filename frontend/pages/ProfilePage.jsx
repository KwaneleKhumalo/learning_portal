import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import SideNav from '../components/SideNav'


const ProfilePage = () => {
  const { userInfo } = useSelector(store => store.auth)
  const [data, setData] = useState("")

  const navigate = useNavigate()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get("redirect") || "/login"

  useEffect(() => {
    if (userInfo) {
      setData(userInfo.data)
    }
    if (!userInfo) {
      navigate(redirect)
      toast.warning(`You're not authorized to perform this action.`)
    }

  }, [userInfo, data, redirect, navigate])

  console.log(data);


  return (
    <div>
      <SideNav />
    </div>
  )
}

export default ProfilePage
