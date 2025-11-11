import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LuPlus, LuTrash2 } from 'react-icons/lu'
import { toast } from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader'
import QuestionCard from './components/QuestionCard'
import ExplanationModal from './components/ExplanationModal'
import Modal from '../../components/Modal'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import moment from 'moment'

const InterviewPrep = () => {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [sessionData, setSessionData] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [openExplanationModal, setOpenExplanationModal] = useState(false)
  const [currentQuestionForExplanation, setCurrentQuestionForExplanation] = useState(null)
  const [explanation, setExplanation] = useState(null)
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoader, setIsUpdateLoader] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch session details
  const fetchSessionDetailsByID = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId))
      if (response.data && response.data.session) {
        setSessionData(response.data.session)
      }
    } catch (error) {
      console.error("Error fetching session: ", error)
      setErrorMessage(error.response?.data?.message || "Failed to load session")
      toast.error("Failed to load session details")
    } finally {
      setIsLoading(false)
    }
  }

  // Generate concept explanation using AI
  const generateConceptExplanation = async (question) => {
    setCurrentQuestionForExplanation(question)
    setOpenExplanationModal(true)
    setExplanation(null)
    setIsLoadingExplanation(true)

    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question: question.question
      })

      if (response.data) {
        setExplanation(response.data)
        toast.success("Explanation generated successfully!")
      }
    } catch (error) {
      console.error("Error generating explanation: ", error)
      toast.error("Failed to generate explanation. Please try again.")
    } finally {
      setIsLoadingExplanation(false)
    }
  }

  // Toggle pin status of a question
  const toggleQuestionPinStatus = async (questionID) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionID))

      if (response.data && response.data.question) {
        // Update the question in sessionData
        setSessionData(prev => {
          const updatedQuestions = prev.questions.map(q =>
            q._id === questionID
              ? { ...q, isPinned: response.data.question.isPinned }
              : q
          )
          return { ...prev, questions: updatedQuestions }
        })

        toast.success(
          response.data.question.isPinned
            ? "Question pinned to top"
            : "Question unpinned"
        )
      }
    } catch (error) {
      console.error("Error toggling pin: ", error)
      toast.error("Failed to update pin status")
    }
  }

  // Update note for a question
  const updateQuestionNote = async (questionID, note) => {
    setIsUpdateLoader(true)
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.UPDATE_NOTE(questionID), {
        note
      })

      if (response.data && response.data.question) {
        // Update the question in sessionData
        setSessionData(prev => {
          const updatedQuestions = prev.questions.map(q =>
            q._id === questionID
              ? { ...q, note: response.data.question.note }
              : q
          )
          return { ...prev, questions: updatedQuestions }
        })

        toast.success("Note saved successfully!")
      }
    } catch (error) {
      console.error("Error updating note: ", error)
      toast.error("Failed to save note")
    } finally {
      setIsUpdateLoader(false)
    }
  }

  // Upload more questions
  const uploadMoreQuestions = async () => {
    if (!sessionData) return

    setIsUpdateLoader(true)
    try {
      // Generate new questions using AI
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData.role,
          experience: sessionData.experience,
          topicsToFocus: sessionData.topicsToFocus,
          numberOfQuestions: 10,
        }
      )

      if (aiResponse.data && Array.isArray(aiResponse.data)) {
        // Add questions to session
        const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
          sessionId: sessionId,
          questions: aiResponse.data
        })

        if (response.data) {
          // Refresh session data
          await fetchSessionDetailsByID()
          toast.success("More questions added successfully!")
        }
      }
    } catch (error) {
      console.error("Error adding more questions: ", error)
      toast.error("Failed to add more questions")
    } finally {
      setIsUpdateLoader(false)
    }
  }

  // Delete session
  const handleDeleteSession = async () => {
    setIsDeleting(true)
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionId))
      toast.success("Session deleted successfully")
      navigate('/dashboard')
    } catch (error) {
      console.error("Error deleting session: ", error)
      toast.error("Failed to delete session")
    } finally {
      setIsDeleting(false)
      setOpenDeleteModal(false)
    }
  }

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsByID()
    }
  }, [sessionId])

  // Sort questions: pinned first, then by creation date
  const sortedQuestions = sessionData?.questions
    ? [...sessionData.questions].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    : []

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
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
        <>
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

          <div className="container mx-auto px-4 md:px-6 py-8">
            {/* Questions List */}
            {sortedQuestions.length > 0 ? (
              <div className="space-y-6">
                <AnimatePresence>
                  {sortedQuestions.map((question) => (
                    <QuestionCard
                      key={question._id}
                      question={question.question}
                      answer={question.answer}
                      note={question.note}
                      isPinned={question.isPinned}
                      onPin={() => toggleQuestionPinStatus(question._id)}
                      onUpdateNote={(note) => updateQuestionNote(question._id, note)}
                      onGenerateExplanation={() => generateConceptExplanation(question)}
                      isGeneratingExplanation={isLoadingExplanation && currentQuestionForExplanation?._id === question._id}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No questions available in this session.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="fixed bottom-10 right-10 flex flex-col gap-3">
              <button
                onClick={uploadMoreQuestions}
                disabled={isUpdateLoader}
                className="h-12 w-12 flex items-center justify-center bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add more questions"
              >
                {isUpdateLoader ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <LuPlus size={24} />
                )}
              </button>

              <button
                onClick={() => setOpenDeleteModal(true)}
                className="h-12 w-12 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
                title="Delete session"
              >
                <LuTrash2 size={20} />
              </button>
            </div>
          </div>

          {/* Explanation Modal */}
          <ExplanationModal
            isOpen={openExplanationModal}
            onClose={() => {
              setOpenExplanationModal(false)
              setExplanation(null)
              setCurrentQuestionForExplanation(null)
            }}
            explanation={explanation}
            isLoading={isLoadingExplanation}
            question={currentQuestionForExplanation?.question}
          />

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            title="Delete Session"
          >
            <div className="p-6">
              <p className="text-sm text-gray-300 mb-6">
                Are you sure you want to delete the session for{' '}
                <span className="font-semibold text-white">"{sessionData.role}"</span>?
                This action cannot be undone and will delete all associated questions.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSession}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Session'}
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </DashboardLayout>
  )
}

export default InterviewPrep
