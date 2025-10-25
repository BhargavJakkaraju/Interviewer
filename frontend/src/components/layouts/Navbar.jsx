import React, { useContext } from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link, useLocation } from "react-router-dom"
import { UserContext } from '../../context/UserContext'
import { LuSparkles } from 'react-icons/lu'

const Navbar = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          {/* Logo/Brand */}
          <Link to={user ? '/dashboard' : '/'} className='flex items-center gap-2'>
            <LuSparkles className='text-2xl text-orange-500' />
            <span className='text-xl text-black font-bold'>Landly AI</span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className='hidden md:flex items-center gap-6'>
              <Link 
                to='/dashboard' 
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  isActive('/dashboard') 
                    ? 'text-orange-500 font-semibold' 
                    : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
            </div>
          )}

          {/* Profile Section */}
          <div className='flex items-center gap-4'>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <div className='flex items-center gap-3'>
                <Link 
                  to='/login' 
                  className='text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors'
                >
                  Login
                </Link>
                <Link 
                  to='/signUp' 
                  className='bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-5 py-2 rounded-full hover:shadow-lg hover:shadow-orange-300/50 transition-all cursor-pointer'
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar