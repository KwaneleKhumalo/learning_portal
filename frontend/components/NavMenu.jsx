import { Navbar, Container, Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const NavMenu = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <Nav className="justify-content-end">
          <Link className="nav-link" to="/login">
            Sign In
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavMenu
