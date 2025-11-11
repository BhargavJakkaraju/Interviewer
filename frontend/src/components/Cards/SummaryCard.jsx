import React from 'react'

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return <div
    className='bg-gray-900 border border-gray-700/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-orange-500/20 relative group transition-shadow'
    onClick={onSelect}
  >
    <div
      className='rounded-lg p-4 cursor-pointer relative'
      style={{
        background: colors.bgcolor,
      }}
    >
      <div className='flex items-start gap-3'>
        <div className='flex-shrink-0'>
          <span className='flex items-center justify-center w-10 h-10 bg-orange-500/20 rounded-full text-sm font-semibold text-orange-500'>
            Role
          </span>
        </div>

        <div className='flex-1'>
          <div className='pr-8'>
            <div>
              <h2 className='text-lg font-semibold text-white mb-1'>{role}</h2>
              <p className='text-sm text-gray-300 line-clamp-2'>
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        className='absolute top-3 right-3 text-xs font-medium text-red-400 bg-gray-800/80 hover:bg-gray-800 px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm'
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        delete
      </button>
    </div>

    <div className='p-4'>
      <div className='flex items-center gap-4 mb-3 flex-wrap'>
        <div className='text-xs font-medium text-gray-300 bg-gray-800 px-3 py-1.5 rounded-md'>
          Experience: {experience} {experience == 1 ? "Year" : "Years"}
        </div>

        <div className='text-xs font-medium text-black bg-orange-500 px-3 py-1.5 rounded-md'>
          {questions} Q&A
        </div>

        <div className='text-xs font-medium text-gray-400'>
          Last Updated: {lastUpdated}
        </div>
      </div>

      <p className='text-sm text-gray-400 line-clamp-2'>
        {description}
      </p>
    </div>
  </div>
}

export default SummaryCard