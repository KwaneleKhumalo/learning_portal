import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"
import { FaHome, FaBookOpen } from "react-icons/fa"

const SideNav = () => {
  return (
    <>
      <Navbar fixed="bottom" className="h-100 d-flex flex-column text-bg-light text-center" variant="dark" bg="dark" style={{ width: "4rem", zIndex: '1', paddingTop: "5rem"}}>
        <Navbar.Brand className="mx-auto mb-5 text-light">
          <Link to={"/"} className="nav-link">
            <FaHome size={35} />
          </Link>
        </Navbar.Brand>
        <hr className="text-" />
        <Link to={"/classes"} className="nav-link text-light">
          <FaBookOpen size={35} />
        </Link>
      </Navbar>
    </>
  )
}

export default SideNav
