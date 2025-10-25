import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  }

  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/Brand */}
          <Link to="/dashboard" className='flex items-center space-x-2'>
            <div className='text-2xl font-bold bg-gradient-to-r from-[#FF9324] to-[#e99a4b] bg-clip-text text-transparent'>
              InterviewPrep
            </div>
          </Link>

          {/* Navigation Links */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-[#FF9324]' 
                  : 'text-gray-600 hover:text-[#FF9324]'
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Profile Section */}
          <div className='flex items-center'>
            <ProfileInfoCard />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar