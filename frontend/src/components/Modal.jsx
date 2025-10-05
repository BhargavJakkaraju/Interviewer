import React from 'react'

const Modal = ({children, isOpen, onClose, title, hideHeader}) => {
  return (
    <div 
        className={'relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden'}
    >
        {!hideHeader &&  (
            <div className=''>
                <h3 className='title'>{title}</h3>
            </div>
        )}

    </div>
  )
}

export default Modal