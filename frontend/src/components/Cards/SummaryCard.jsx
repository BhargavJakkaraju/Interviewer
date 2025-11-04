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
  return  <div 
    className='' 
    onClick={onSelect}
  >
    <div 
      className=''
      style={{
        background: colors.bgcolor,
      }}
    >
      <div className=''>
        <div className=''>
          <span className=''>
            GU
          </span>
        </div>

        <div className=''>
          <div className=''>
            <div>
              <h2 className=''>{role}</h2>
              <p className=''>
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        className=''
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        delete
      </button>
    </div>

    <div className=''>
      <div className=''>
        <div className=''>
          Experience: {experience} {experience == 1 ? "Year" : "Year"}
        </div>

        <div className=''>
          {questions} Q&A
        </div>

        <div className=''>
          Last Updated: {lastUpdated}
        </div>
      </div>

      <p className=''>
        {description}
      </p>
    </div>
  </div>
}

export default SummaryCard