import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Nabar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// If the server says the token is invalid or expired, go back to the login page
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && localStorage.getItem("adminToken")) {
      localStorage.removeItem("adminToken")
      window.location.href = "/login"
    }
    return Promise.reject(err)
  }
)

const App = () => {
  const URl = import.meta.env.VITE_API_URL || "http://localhost:4000"
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "")

  // Send the admin token with every request
  if (token) {
    axios.defaults.headers.common["token"] = token
  } else {
    delete axios.defaults.headers.common["token"]
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    setToken("")
  }

  const Layout = (
    <div>
      <Navbar onLogout={logout} />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add URl={URl} />} />
          <Route path="/list" element={<List URl={URl} />} />
          <Route path="/orders" element={<Orders URl={URl} />} />
          <Route path="*" element={<Navigate to="/add" replace />} />
        </Routes>
      </div>
    </div>
  )

  return (
    <div>
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
     
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/add" replace /> : <Login URl={URl} setToken={setToken} />}
        />
        <Route path="/*" element={token ? Layout : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App