import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation } from "../src/slices/studentsApiSlice"
import { setCredentials } from "../src/slices/authSlice"
import { Form, Row, Col, Button } from "react-bootstrap"
import { toast } from "react-toastify"


const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state => state.auth))
  
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/dashboard'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])


  const handleLogin = async e => {
    e.preventDefault()

    if (email === "" || password === "") {
      toast.error("Enter Email And/or Password")
    }

    try {
      const response = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...response }))
      navigate(redirect)
      toast.success("Welcome Back!")
      setEmail("")
      setPassword("")
    } catch (error) {
      toast.error(error.data.msg)
      console.log(error)
    }
    
  }

  return (
    <Row>
      <h1 className="text-center mt-5 mb-5">Sign In</h1>
      <Col className="mx-auto p-5 rounded shadow" md={6} lg={3}>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address: </Form.Label>
            <Form.Control type="email" autoComplete="off" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="success" type="submit" disabled={isLoading}>
            Submit
          </Button>
          <Col>
            <Link className="nav-link text-primary text-center" to={"/register"}>
              Register for an account
            </Link>
          </Col>
        </Form>
      </Col>
    </Row>
  )
}

export default LoginForm
