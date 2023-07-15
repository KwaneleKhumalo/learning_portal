import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import RegistrationPage from "../pages/RegistrationPage.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />

)
