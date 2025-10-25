import React, { useContext } from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link, useLocation } from "react-router-dom"
import { UserContext } from '../../context/UserContext'

const Navbar = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/Brand */}
          <Link to={user ? "/dashboard" : "/"} className='flex items-center gap-2 group'>
            <div className='w-10 h-10 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-orange-300/50 transition-all'>
              <span className='text-white font-bold text-xl'>IP</span>
            </div>
            <span className='text-xl font-bold bg-gradient-to-r from-[#FF9324] to-[#e99a4b] bg-clip-text text-transparent hidden sm:block'>
              Interview Prep
            </span>
          </Link>

          {/* Navigation Links */}
          <div className='flex items-center gap-6'>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-semibold transition-colors hover:text-[#FF9324] ${
                    isActive('/dashboard') 
                      ? 'text-[#FF9324] border-b-2 border-[#FF9324] pb-1' 
                      : 'text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                <ProfileInfoCard />
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className='text-sm font-semibold text-gray-700 hover:text-[#FF9324] transition-colors'
                >
                  Login
                </Link>
                <Link 
                  to="/signUp" 
                  className='bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-orange-300/50 transition-all'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar