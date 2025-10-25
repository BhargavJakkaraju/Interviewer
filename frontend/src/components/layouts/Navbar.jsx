import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/Brand Section */}
          <div className='flex-shrink-0'>
            <Link to='/dashboard' className='flex items-center'>
              <span className='text-2xl font-bold bg-gradient-to-r from-[#FF9324] to-[#e99a4b] bg-clip-text text-transparent'>
                Interviewer
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className='hidden md:flex items-center space-x-8'>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[#FF9324] border-b-2 border-[#FF9324] pb-1'
                    : 'text-gray-700 hover:text-[#FF9324]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile Section */}
          <div className='flex items-center'>
            <ProfileInfoCard />
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#FF9324] hover:bg-gray-100 focus:outline-none'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar