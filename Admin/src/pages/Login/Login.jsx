import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Login.css'

const Login = ({ URl, setToken }) => {
  const [data, setData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const onChange = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    console.log("Logging in at:", `${URl}/api/user/admin-login`)
    try {
      const res = await axios.post(`${URl}/api/user/admin-login`, data)
      console.log("Login response:", res.data)
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token)
        setToken(res.data.token)
        navigate("/add")
      } else {
        setError(res.data.message || "Login failed")
      }
    } catch (err) {
      console.log("Login error:", err)
      if (err.response) {
        setError(`Server error ${err.response.status}: ${err.response.data?.message || "see Backend terminal"}`)
      } else {
        setError("Cannot reach the server. Is the backend running on port 4000?")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-box" onSubmit={onSubmit}>
        <img src={assets.logo} alt="" className="admin-login-logo" />
        <h2>Admin Login</h2>
        <input type="email" name="email" placeholder="Admin email" value={data.email} onChange={onChange} required />
        <input type="password" name="password" placeholder="Password" value={data.password} onChange={onChange} required />
        {error && <p className="admin-login-error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  )
}

export default Login