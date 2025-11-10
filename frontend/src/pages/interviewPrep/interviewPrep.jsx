import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { AnimatePresence, motion } from 'framer-motion'
import { LuCircleAlert, LuList } from 'react-icons/lu'
import { toast } from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const InterviewPrep = () => {
  const { sessionId } = useParams()
  const [sessionData, setSessionData] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [openLMD, setOpenLMD] = useState(false)
  const [explanation, setExplanation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoader, setIsUpdateLoader] = useState(false)

  const fetchSessionDetailsByID = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId))
      console.log("Session data response:", response.data)
      if (response.data && response.data.session) {
        setSessionData(response.data.session)
        console.log("Session data set:", response.data.session)
      }
    } catch (error) {
      console.error("Error fetching session: ", error)
      setErrorMessage(error.response?.data?.message || "Failed to load session")
      toast.error("Failed to load session details")
    } finally {
      setIsLoading(false)
    }
  }
  const generateConceptExplanation = async (question) => { }
  const toggleQuestionPinStatus = async (questionID) => { }
  const uploadMoreQuestions = async () => { }

  useEffect(() => {
    console.log("SessionId from params:", sessionId)
    if (sessionId) {
      fetchSessionDetailsByID()
    } else {
      console.error("No sessionId found in URL params")
    }
  }, [sessionId])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading session details...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (errorMessage) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {sessionData && (
        <RoleInfoHeader
          role={sessionData.role || ""}
          topicsToFocus={sessionData.topicsToFocus || ""}
          experience={sessionData.experience || "-"}
          questions={sessionData.questions?.length || 0}
          description={sessionData.description || ""}
          lastUpdated={
            sessionData.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""
          }
        />
      )}
    </DashboardLayout>
  )
}

export default InterviewPrep