import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import {AnimatePresence, motion} from 'framer-motion'
import { LuCircleAlert, LuListCollage} from 'react-icons/lu'
import { toast } from 'react-hot-toast'

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

  
  return (
    <div>interviewPrep</div>
  )
}

export default InterviewPrep