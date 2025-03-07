import React from 'react'
import NavBar from '../../../components/NavBar/NavBar.jsx'
import Imagetext from '../Introduction/imagetext.jsx'
import Introduction from '../systemintro/introduction.jsx'
import Programs from '../healthprograms/programs.jsx'

function Homepage() {
  return (
    <div>
        <NavBar/>
        <Imagetext/>
        <div className='container'>
        <Introduction title="HealthOptics" subtitle="Choose Your Matching Spectacls"/>
        <Programs/>
        </div>
    </div>
  )
}

export default Homepage
