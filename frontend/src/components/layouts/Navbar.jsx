import React, { useContext } from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link, useLocation } from "react-router-dom"
import { UserContext } from '../../context/userContext'
import { HiSparkles } from 'react-icons/hi2'

const Navbar = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF9324] to-[#e99a4b] shadow-lg shadow-orange-300/30 group-hover:shadow-orange-400/50 transition-shadow">
              <HiSparkles className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF9324] to-[#e99a4b] bg-clip-text text-transparent">
              InterviewPrep
            </span>
          </Link>

          {/* Navigation Links - Only show when user is logged in */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/dashboard')
                    ? 'bg-orange-50 text-[#FF9324] font-semibold'
                    : 'text-gray-600 hover:text-[#FF9324] hover:bg-orange-50/50'
                }`}
              >
                Dashboard
              </Link>
            </div>
          )}

          {/* Right Section - Profile or Auth Links */}
          <div className="flex items-center gap-4">
            {user ? (
              <ProfileInfoCard />
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#FF9324] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#FF9324] to-[#e99a4b] rounded-lg hover:shadow-lg hover:shadow-orange-300/50 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only show when user is logged in */}
      {user && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-4 py-2 flex gap-2">
            <Link
              to="/dashboard"
              className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/dashboard')
                  ? 'bg-orange-50 text-[#FF9324] font-semibold'
                  : 'text-gray-600 hover:text-[#FF9324] hover:bg-orange-50/50'
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar