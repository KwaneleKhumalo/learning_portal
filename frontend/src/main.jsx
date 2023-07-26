import React from "react"
import ReactDOM from "react-dom/client"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store.js"
import App from "./App.jsx"
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import RegistrationPage from "../pages/RegistrationPage.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import Dashboard from "../pages/Dashboard.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
