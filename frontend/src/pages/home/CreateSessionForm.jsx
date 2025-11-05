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
  return <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black'>
        New Interview Prep
    </h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-3'>
        Fill out the following fields
    </p>

    <form onSubmit={handleCreateSession} className='flex flex-col gap-3'>
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

        {error && <p className='text-red-500 text-xs pb-2.5'> {error}</p>}

        <button 
            type="submit"
            className="btn-primary w-full mt-2"
            disabled={isLoading}
        >
            Create Session
        </button>

    </form>
  </div>
}

export default CreateSessionForm