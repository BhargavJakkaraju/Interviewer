import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';


const SignUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const[error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!fullName) {
      setError("Enter your full name")
      return
    }

    if (!validateEmail(email)) {
      setError("Enter valid email address")
      return
    }

    if(!password) {
      setError("Enter a valid password")
      return
    }

    setError("")

    try{
    } catch(error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong please try again")
      }
    }
  }

  return <div className='w-[90vm] md:w-[33vm] p-7 flex flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black'>Create Your Account</h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-6'>
      Enter your personal details below
    </p>

    <form onSubmit={handleSignUp}>

      <div className='grid grid-col-1 md:grid-cols-1 gap-2'>
        <Input 
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label='Full Name'
          placeHolder='Name'
          type='text'
        />

        <Input 
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label='Email Address'
          placeHolder='name@email.com'
          type='text'
        />

        <Input 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label='Password'
          placeHolder='Minimum 8 Characters'
          type='password'
        />
      </div>

      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button type='submit' className='btn-primary'>
        Sign Up
      </button>

      <p className='text-[13px] text-slate-800 mt-3'>
        Already have an account?{" "}
        <button className='font-medium text-primary underline cursor-pointer' onClick={() => { setCurrentPage("login")}}>
          Login
        </button>
      </p>

    </form>
  </div>
}

export default SignUp