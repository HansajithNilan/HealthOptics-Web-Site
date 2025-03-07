import React from 'react'

import './introduction.css'

function introduction({title,subtitle}) {
  return (
    <div className='system-intro'>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}

export default introduction
