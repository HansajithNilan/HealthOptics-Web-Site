import React from 'react'
import NavBar from '../../../components/NavBar/NavBar.jsx'
import Imagetext from '../Introduction/imagetext.jsx'
import Introduction from '../systemintro/introduction.jsx'
import Programs from '../healthprograms/programs.jsx'
import About from '../About/about.jsx'
import Footer from '../../../components/Footer/footer.jsx'
import Contact from '../contact/contact.jsx'

function Homepage() {
  return (
    <div>
        <NavBar/>
        <Imagetext/>
        <div className='container'>
        <Introduction title="HealthOptics" subtitle="Choose Your Matching Spectacls"/>
        <Programs/>
        <Introduction title="About us" subtitle="Choose Your Matching Spectacls"/>
        <About/>
        <Contact/>
        <Footer/>

        </div>
    </div>
  )
}

export default Homepage
