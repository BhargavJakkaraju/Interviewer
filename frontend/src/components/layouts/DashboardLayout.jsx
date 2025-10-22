import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const DashboardLayout = () => {
    const {user} = useContext(UserContext)
  return (
    <div>
        <NavBar />

        {user && <div>{children}</div>}
    </div>
  )
}

export default DashboardLayout