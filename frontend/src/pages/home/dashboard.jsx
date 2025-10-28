import React, { useState, useEffect } from 'react'
import { LuPlus } from 'react-icons/lu'
import { CARD_BG } from "../../utils/data"
import toast from "react-hot-toast"
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [session, setSession] = useState({
    open: false,
    data: null
})

const fetchAllSessions = async () => {}

useEffect(() => {
  fetchAllSessions()
})
  return (
    <DashboardLayout>Dashboard</DashboardLayout>
  )
}

export default Dashboard