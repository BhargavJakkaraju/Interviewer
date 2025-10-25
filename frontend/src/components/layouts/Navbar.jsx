import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Brand */}
          <Link to="/dashboard" className='flex items-center gap-2'>
            <div className='text-2xl font-bold bg-gradient-to-r from-[#FF9324] to-[#e99a4b] bg-clip-text text-transparent'>
              InterviewPrep
            </div>
          </Link>

          {/* Navigation Links - Middle Section */}
          <div className='hidden md:flex items-center gap-8'>
            <Link 
              to="/dashboard" 
              className='text-gray-700 hover:text-[#FF9324] font-medium transition-colors duration-200'
            >
              Dashboard
            </Link>
          </div>

          {/* Profile Section - Right */}
          <div className='flex items-center'>
            <ProfileInfoCard />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar