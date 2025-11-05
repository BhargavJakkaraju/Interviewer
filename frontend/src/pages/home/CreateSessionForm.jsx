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

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

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

    <form onSubmit={handleCreateSession} className=''>
        <Input
            value={formData.role}
            onChange={({ target }) => handleChange("role", target.value)}
            label="Target Role"
            placeHolder='Frontend dev, Backend dev, etc. '
            type='text'
        />

        <Input
            value={formData.experience}
            onChange={({ target }) => handleChange("role", target.value)}
            label="Years of Experience"
            placeHolder='1 year, 2 year, 3+ years'
            type='number'
        />

        <Input
            value={formData.topicsToFocus}
            onChange={({ target }) => handleChange("role", target.value)}
            label="Topics to Focus"
            placeHolder='React.js, Routes, Database'
            type='text'
        />

        <Input
            value={formData.description}
            onChange={({ target }) => handleChange("role", target.value)}
            label="Description"
            placeHolder='Specifc Goals'
            type='text'
        /> 

        {error && <p className=''> {error}</p>}

        <button 
            type="submit"
            className=""
            disabled={isLoading}
        >
            Create Session
        </button>

    </form>
  </div>
}

export default CreateSessionForm