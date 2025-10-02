import React, { useState } from 'react'
import { APP_FEATURES } from '../utils/data'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {}
  return (
    <div className='w-full min-h-full bg-[#FFFCEF]'>
      <div className='w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0' />

      <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
        {/* Header*/}
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl text-black font-bold'>
            Interview Prep AI
          </div>
            <button className='' onClick={() => setOpenAuthModel(true)}>
            Login/Sign up
            </button>
        </header>

        {/* Hero Content */}
        <div className=''>
          <div className=''>
            <div className=''>
              <div className=''>
                Powered with AI
              </div>
            </div>

            <h1 className=''>
              The Perfect AI tool
              <span className=''>
                AI-Powered 
              </span>{" "}
            </h1>
          </div>

          <div className=''>
            <p className=''>
              Find the exact questions you need for your role, 
              learn the deeper meaning with AI, and maxinimize 
              your organization
            </p>

            <button className='' onClick={handleCTA}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage