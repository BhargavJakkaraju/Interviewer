import React, { createContext, useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearuser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider