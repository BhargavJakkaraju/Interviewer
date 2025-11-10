import React from 'react'

const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience,
    description,
    questions,
    lastUpdated
}) => {
  return <div className=''>
    <div className=''>
      <div className=''>
        <div className=''>
          <div className=''>
            <div className=''>
              <h2 className=''>{role}</h2>
              <p className=''>
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default RoleInfoHeader