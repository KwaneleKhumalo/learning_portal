import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useLogoutMutation } from "../src/slices/studentsApiSlice"
import { logout } from "../src/slices/authSlice"
import { useNavigate } from "react-router-dom"

import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const NavMenu = () => {
  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="secondary" variant="dark" className="px-5" style={{zIndex: "2"}}>
      <>
        <Link to="/" className="navbar-brand px-5">
          Website
        </Link>
        <Nav className="justify-content-end align-items-center ms-auto px-5">
          {userInfo ? (
            <NavDropdown variant={"dark"} className="text-light my-auto text-center justify-content-center" id="username" title={userInfo.data.name}>
              <Link to={"/profile"} className="nav-link text-center text-secondary dropdown-item">
                My Profile
              </Link>
              <Link to={"/settings"} className="nav-link text-center text-secondary dropdown-item">
                Account Settings
              </Link>
              <NavDropdown.Item className="nav-link text-center text-secondary" onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Sign In
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </Nav>
      </>
    </Navbar>
  )
}

export default NavMenu
