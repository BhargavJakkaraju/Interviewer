import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import {AnimatePresence, motion} from 'framer-motion'
import { LuCircleAlert, LuList} from 'react-icons/lu'
import { toast } from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader'

const InterviewPrep = () => {
  const { sessionId } = useParams()
  const [sessionData, setSessionData] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [openLMD, setOpenLMD] = useState(false)
  const [explanation, setExplanation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoader, setIsUpdateLoader] = useState(false)

  const fetchSessionDetailsByID = async () => {}
  const generateConceptExplanation = async (question) => {}
  const toggleQuestionPinStatus = async (questionID) => {}
  const uploadMoreQuestions = async () => {}

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsByID()
    }

    return () => {}
  }, [])

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFoucs={sessionData?.topicsToFoucs || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.question || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.udpated ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""
        }
      />
    </DashboardLayout>
  )
}

export default InterviewPrep