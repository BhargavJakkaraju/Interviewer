import React, { useContext, useState } from 'react'
import { APP_FEATURES } from '../utils/data'
import { useNavigate } from 'react-router-dom'
import {LuSparkles} from 'react-icons/lu'
import Modal from '../components/Modal'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import { UserContext } from '../context/UserContext'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'

const LandingPage = () => {
  const {user} = useContext(UserContext)
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true)

    } else {
      navigate('/dashboard')
    }
  }
  return (
   <>

    <div className='w-full min-h-full bg-black'>
      <div className='w-[500px] h-[500px] bg-orange-500/20 blur-[65px] absolute top-0 left-0' />

      <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
        {/* Header*/}
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl text-white font-bold'>
            Landly AI
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (  <button className='bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-orange-600 border border-orange-500 transition-colors cursor-pointer' onClick={() => setOpenAuthModal(true)}>
            Login/Sign up
            </button>
          )}
        </header>

        {/* Hero Content */}
        
        <div className='flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
            <div className='flex items-center justify-left mb-2'>
              <div className='flex items-center gap-p text-[13px] text-orange-500 font-semibold bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/50'>
                Powered with AI
              </div>
            </div>

            <h1 className='text-5xl text-white font-medium mb-6 leading-tight'>
              The Perfect tool with <br />
              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>
                <LuSparkles /> AI-Powered 
              </span>{" "}
              Learning
            </h1>
          </div>

          <div className='w-full md:w-1/2'>
            <p className='text-[17px] text-gray-300 mr-0 md:mr-20 mb-6'>
              Find the exact questions you need for your role, 
              learn the deeper meaning with AI, and maxinimize 
              your organization
            </p>

            <button className='bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-orange-600 border border-orange-500 transition-colors cursor-pointer' onClick={handleCTA}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className='w-full min-h-full relative z-10'>

      <div className='w-full min-h-full bg-black mt-10'>
        <div className='container mx-auto px-4 pt-10 pb-20'>
          <section className='mt-5'>
            <h2 className='text-2xl font-medium text-center mb-12 text-white'>
              Supporting Features 
            </h2>
            <div className='flex flex-col items-center gap-8'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                {APP_FEATURES.slice(0,3).map((feature) => (
                  <div
                    key={feature.id}
                    className='bg-gray-900 p-6 rounded-xl shadow-xs hover:shadow-lg shadow-orange-500/20 transition border border-orange-500/30'
                  >
                    <h3 className='text-base font-semibold mb-3 text-white'>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className='bg-gray-900 p-6 rounded-xl shadow-xs hover:shadow-lg shadow-orange-500/20 transition border border-orange-500/30'
                  >

                    <h3 className='text-base font-semibold mb-3 text-white'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-400'>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

    </div>

    <Modal
      isOpen={openAuthModal}
      onClose ={() => {
        setOpenAuthModal(false)
        setCurrentPage("login")
      }}
      hideHeader
    >
      <div>
      {currentPage === "login" && (
        <Login setCurrentPage={setCurrentPage} />
      )}

      {currentPage === "signup" && (
        <SignUp setCurrentPage={setCurrentPage} />
      )}
      </div>
    </Modal>
   </> 
  )
}

export default LandingPage