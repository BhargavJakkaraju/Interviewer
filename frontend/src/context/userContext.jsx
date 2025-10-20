import React, { createContext, useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'
import axios from 'axios'

export const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) return

        const accessToken = localStorage.getItem("token")
        if (!accessToken) {
            setLoading(false)
            return
        }

        const fetchUser = async () => {
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE)
                setUser(response.data)
            } catch(error) {
                console.error("User not authorized", error)
                clearuser()
            } finally {
                setLoading(false)
            }
        }

        fetchUser();
    }, [])

    const updateUser = (userData) => {
        setUser(userData)
        localStorage.setItem("token", userData.token)
        setLoading(false)
    }

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearuser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider