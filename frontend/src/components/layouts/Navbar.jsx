import React, { useContext } from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link, useLocation } from "react-router-dom"
import { UserContext } from '../../context/UserContext'

const Navbar = () => {
  return (
    <div className='h-16 bg-black border border-b border-gray-800 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top- z-30'>
      <div className='container mx-auto flex items-center justify-between gap-5'> 
        <Link to='/dashboard'>
          <h2 className='text-lg md:text-xl font-medium text-white leading-5'>Landly</h2>
        </Link>

        <ProfileInfoCard />


      </div>
    </div>

    


  ) 
}

export default Navbar