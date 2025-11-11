import React from 'react'

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  description,
  questions,
  lastUpdated
}) => {
  return <div className='bg-black relative'>
    <div className='container mx-auto px-10 md:px-0 relative z-[2]'>
      <div className='h-[200px] flex flex-col justify-center relative z-10'>
        <div className='flex items-start'>
          <div className='flex-grow'>
            <div className='flex justify-between items-start'>
              <div>
                {role && <h2 className='text-2xl font-medium text-white'>{role}</h2>}
                {description && description.trim() && (
                  <p className='text-sm text-gray-300 mt-2 mb-1'>
                    {description}
                  </p>
                )}
                {topicsToFocus && topicsToFocus.trim() && (
                  <p className='text-sm text-medium text-gray-300 mt-1'>
                    {topicsToFocus}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-3 mt-4'>
          <div className='text-[10px] font-semibold text-black bg-orange-500 px-3 py-1 rounded-full'>
            Experience: {experience == 1 ? "Year" : "Years"}
          </div>

          <div className='text-[10px] font-semibold text-black bg-orange-500 px-3 py-1 rounded-full'>
            {questions} Q&A
          </div>

          <div className='text-[10px] font-semibold text-black bg-orange-500 px-3 py-1 rounded-full'>
            Last Updated: {lastUpdated}
          </div>
        </div>
      </div>

      <div className='w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center absolute top-0 right-0 overflow-hidden z-[1]'>
        <div className='w-16 h-16 bg-lime-400 blur-[65px] animate-blob1' />
        <div className='w-16 h-16 bg-teal-400 blur-[65px] animate-blob2' />
        <div className='w-16 h-16 bg-cyan-400 blur-[65px] animate-blob3' />
        <div className='w-16 h-16 bg-fuchsia-400 blur-[65px] animate-blob4' />
      </div>
    </div>
  </div>
}

export default RoleInfoHeader