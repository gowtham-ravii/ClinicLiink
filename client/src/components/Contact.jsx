import React,{useState,useContext} from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/contact.css';
import { userContext } from './Login';
import axios from 'axios'

const Contact = () => {
  const [message,setMessage]=useState("")
  const {userName,userEmail}=useContext(userContext)
  const [errorMessage,setErrorMessage]=useState("");
  const handleMessageChange=(e)=>{
    setMessage(e.target.value)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!message){
      setErrorMessage("Please enter your Message");
    }else{
    axios.post('http://localhost:5000/contact',{name:userName,email:userEmail,message:message})
    .then((res)=>{
      console.log(res);
      setErrorMessage("Message sent")
      setMessage("")
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  }
  return (
    <div style={{ padding: '20px' }}>
      
      <div className="contact">
        <h1>Contact Us</h1>
        <form action="POST" onSubmit={handleSubmit}>
          <div className="form-groupc">
            <label htmlFor="name">Name</label><br/>
            <input type="text" name="name" id="name" value={userName} />
          </div>
          <div className="form-groupc">
            <label htmlFor="email">Email</label><br/>
            <input type="email" name="email" id="email" value={userEmail}/>
          </div>
          <div className="form-groupc">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" value={message} onChange={handleMessageChange}/>
          </div>

          <input type="submit" value="Send" className="cntbtn" />
          <div className="contactErr">
          {errorMessage && <p>{errorMessage}</p>}
          </div>
        </form>
        <p>Connect with us through</p>
        <div className="icons">
          <FaFacebook className="icon" />
          <FaInstagram className="icon" />
          <FaTwitter className="icon" />
          <FaLinkedin className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
