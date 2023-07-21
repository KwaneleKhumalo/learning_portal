import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import NavMenu from "../components/NavMenu"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
    <>
      <Header nav={<NavMenu />} />
      <Outlet />
      <ToastContainer position="top-left" theme="dark" autoClose={2000} />
    </>
  )
}

export default App
