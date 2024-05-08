import React,{useContext} from 'react'
import axios from 'axios'
import About from './About'
import '../styles/home.css'
import Foot from './Foot'
import Homecircle from './Homecircle'
import Contact from './Contact'
import {FaStethoscope} from 'react-icons/fa'
import { userContext } from './Login'
const Home = () => {
  const {userName}=useContext(userContext)
  return (
    <div style={{paddingTop:'40px'}}>
      <div className="titcon">
      <div className='tit'>
      <h1>Clinic_linK.....<FaStethoscope/></h1>
      </div>
      <pre><b><i>"Caring made simple, appointments made easy. Welcome to ClinicLink,</i></b></pre>
      <pre><b><i>where every click brings you closer to wellness."</i></b></pre>
   
      </div>
      <div className='greeting'>
      <h2>Welcome , {userName}!!</h2>
      </div>
      <br/>
      <Homecircle/>
      <br/>
      <About/>
      <div id="contact">
      <Contact />
      </div>
      <br/>
      <Foot/>
    </div>
  )
}

export default Home
