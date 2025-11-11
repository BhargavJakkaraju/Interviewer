import React, { useState, useEffect } from 'react'
import { LuPlus } from 'react-icons/lu'
import { CARD_BG } from "../../utils/data"
import toast from "react-hot-toast"
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import SummaryCard from '../../components/Cards/SummaryCard'
import moment from 'moment'
import CreateSessionForm from './CreateSessionForm'
import Modal from '../../components/Modal'

const Dashboard = () => {
  const navigate = useNavigate()
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [sessions, setSessions] = useState([])
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  })

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data)
    } catch (error) {
      console.error('Error', error)
      toast.error('Failed to fetch sessions')
    }
  }

  const handleDeleteSession = async () => {
    try {
      const sessionId = openDeleteAlert.data?._id
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionId))
      
      toast.success('Session deleted successfully')
      setOpenDeleteAlert({ open: false, data: null })
      fetchAllSessions()
    } catch (error) {
      console.error('Delete Error:', error)
      toast.error('Failed to delete session')
    }
  }

  useEffect(() => {
    fetchAllSessions()
  }, [])
  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-6'>
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || ""}
              questions={data?.questions?.length || ""}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        <button className='h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 md:right-20' onClick={() => setOpenCreateModal(true)}>
          <LuPlus className='text-2xl  text-white' />
          Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false)
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm onClose={() => setOpenCreateModal(false)} />
        </div>
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null })
        }}
        title="Delete Session"
      >
        <div className='p-6'>
          <p className='text-sm text-gray-300 mb-6'>
            Are you sure you want to delete the session for <span className='font-semibold text-white'>"{openDeleteAlert.data?.role}"</span>? This action cannot be undone and will delete all associated questions.
          </p>
          
          <div className='flex justify-end gap-3'>
            <button
              onClick={() => setOpenDeleteAlert({ open: false, data: null })}
              className='px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSession}
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors'
            >
              Delete Session
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard