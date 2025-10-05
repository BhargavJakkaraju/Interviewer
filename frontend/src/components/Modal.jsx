import React from 'react'

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>
      <div className='relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden'>
        {!hideHeader && (
          <div className=''>
            <h3 className='title'>{title}</h3>
          </div>
        )}

        <button
          type='button'
          className=''
          onClick={onClose}
        >
          <svg
            className=''
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
        </button>

        <div className=''>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
