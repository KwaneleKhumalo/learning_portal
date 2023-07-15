import { useEffect, useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { validation, auth } from "../utils/FormValidation"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import axios from "axios"

const Registration = () => {

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('')


  const handleRegistration = async (e) => {
    e.preventDefault()
    validation(name, lastName, email, phone, password, confirmPassword)
    auth(name, lastName, email, phone, password)
    setName("")
    setLastName("")
    setEmail("")
    setPhone("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <Row>
      <h1 className="text-center mt-5 mb-5">Registration</h1>
      <Col className="mx-auto border p-5 rounded shadow" md={6} lg={3}>
        <Form onSubmit={handleRegistration} noValidate>
          <Form.Group className="mb-3" controlId="firstname">
            <Form.Label>first Name: </Form.Label>
            <Form.Control type="text" autoComplete="off" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastname">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" autoComplete="off" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address: </Form.Label>
            <Form.Control type="email" autoComplete="off" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone: </Form.Label>
            <Form.Control type="text" autoComplete="off" placeholder="xxx-xxx-xxxx" value={phone} onChange={e => setPhone(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
            <p className="text-secondary">Minimum 8 characters, one symbol, one letter, one number</p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password: </Form.Label>
            <Form.Control type="password" placeholder="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button variant="success" type="submit">
            Register
          </Button>
          <Col>
            <Link className="nav-link text-primary text-center" to={"/login"}>
              Login to your account
            </Link>
          </Col>
        </Form>
      </Col>
    </Row>
  )
}

export default Registration
