import React, { useState } from 'react'
import { APP_FEATURES } from '../utils/data'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {}
  return (
   <>

    <div className='w-full min-h-full bg-[#FFFCEF]'>
      <div className='w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0' />

      <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
        {/* Header*/}
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl text-black font-bold'>
            Landly AI
          </div>
            <button className='bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer' onClick={() => setOpenAuthModel(true)}>
            Login/Sign up
            </button>
        </header>

        {/* Hero Content */}
        
        <div className='flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
            <div className='flex items-center justify-left mb-2'>
              <div className='flex items-center gap-p text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300'>
                Powered with AI
              </div>
            </div>

            <h1 className='text-5xl tex-black font-medium mb-6 leading-tight'>
              The Perfect tool with <br />
              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>
                AI-Powered 
              </span>{" "}
              Learning
            </h1>
          </div>

          <div className='w-full md:w-1/2'>
            <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
              Find the exact questions you need for your role, 
              learn the deeper meaning with AI, and maxinimize 
              your organization
            </p>

            <button className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer' onClick={handleCTA}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
    
   </> 
  )
}

export default LandingPage