import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const ProfileInfoCard = () => {
    const { user, clearuser} = useContext(UserContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear()
        clearuser();
        navigate('/')
    }
  return (
    <div className='flex items-center'>
        <div>
            <div className='text-[15px] text-black font-bold loading-3'>
                {user.name || ''}
            </div>
            <button className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline' onClick={handleLogout}> Logout </button>
        </div>
    </div>
  )
}

export default ProfileInfoCard