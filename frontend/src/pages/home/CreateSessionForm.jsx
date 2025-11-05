import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'

const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    })

    cosnt [isLoading, setIsLoading] = useState(false)
    const [error,, setError] = useState(null)

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        })) 
    }

    const handleCreateSession = async (e) => {
        e.preventDefault()
        const {role, experience, topicsToFocus} = formData
        if (!role || !experience || !topicsToFocus) {
            setError("Correctly fill out the required feilds")
            return
        }

        setError("")

    }
  return <div className=''>
    <h3 className=''>
        New Interview Prep
    </h3>
    <p className=''>
        Fill out the following fields
    </p>
  </div>
}

export default CreateSessionForm