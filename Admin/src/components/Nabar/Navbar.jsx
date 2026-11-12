import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({ onLogout }) => {
  return (
    <div className='Navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <div className='nav-right'>
        <img className='profile' src={assets.profile_image} alt="" />
        <button className='logout-btn' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar