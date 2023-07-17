import { toast } from "react-toastify"
import axios from "axios"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const textRegex = /^[a-zA-Z]+$/

export const validation = (firstname, lastname, email, phone, password, confirmPassword) => {
  if (firstname === "" || firstname.length < 2 || !textRegex.test(firstname)) {
    toast.error("Please enter a valid name")
    return
  }
  if (lastname === "" || lastname.length < 2 || !textRegex.test(lastname)) {
    toast.error("Please enter a valid Last Name")
    return
  }

  if (email === "" || !emailRegex.test(email)) {
    toast.error("Please enter a valid Email Address")
    return // or handle the invalid email case as per your requirement
  } else {
    toast.success("Email Validated")
  }

  if (phone === "" || !phoneRegex.test(phone)) {
    toast.error("Please Enter a valid Phone Number!")
    return
  } else {
    toast.success("Phone Validated!")
  }

  if (password === "") {
    toast.error("Password is Required")
    return
  } else if (password.length < 8) {
    toast.error("Password cannot be less than 8 characters")
    return
  } else if (!passwordRegex.test(password)) {
    toast.error("Invalid Password. Try again")
    return
  } else {
    toast.success("Password Validated")
  }

  if (confirmPassword === "" || confirmPassword !== password) {
    toast.error("Passwords Do not match!")
    return
  } else {
    toast.success("Passwords matched!")
  }
}

export const auth = async (firstname, lastname, email, phone, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/student/registration/auth", {
      firstname,
      lastname,
      email,
      phone,
      password
    })

    if (response) {
      toast.success(response.data.msg)
    }
  } catch (err) {
    toast.error("err.response.data.msg")
  }
}
