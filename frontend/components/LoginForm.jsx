import { useEffect, useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import axios from "axios"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async e => {
    e.preventDefault()

    if (email === "" || password === "") {
      toast.error("Enter Email And/or Password")
    }

    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/student/login/auth",
        {
          email,
          password
        },
        config
      )
      const { data, courses } = response.data
      toast.success(response.data.msg)
      console.log(data, courses)
    } catch (error) {
      toast.error(error.response.data.msg)
      console.log(error.response.data.msg)
    }
    setEmail("")
    setPassword("")
  }

  return (
    <Row>
      <h1 className="text-center mt-5 mb-5">Sign In</h1>
      <Col className="mx-auto border p-5 rounded shadow" md={6} lg={3}>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address: </Form.Label>
            <Form.Control type="email" autoComplete="off" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="success" type="submit">
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
