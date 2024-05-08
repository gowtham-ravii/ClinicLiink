import React,{useState,useEffect} from 'react';
import Foot from './Foot';
import '../styles/register.css';
import { FaStethoscope } from 'react-icons/fa';
import doc2 from '../images/doc2.webp'
import axios from 'axios'
const Register = () => {
  const[name , setName] = useState('')
  const[email , setEmail] = useState('')
  const[password , setPassword] = useState('')
  const[password2 , setPassword2] = useState('')
  const[phone , setPhone] = useState('')
  const[address , setAddress] = useState('')
  const[DOB , setDOB] = useState('')
  const[bloodgroup , setBloodgroup] = useState('')
  const[errorMessage,setErrorMessage] = useState('')
  const handleNameChange=(e)=>{
    setName(e.target.value)
  }
  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange=(e)=>{
    setPassword(e.target.value)
  }
  const handlePassword2Change=(e)=>{
    setPassword2(e.target.value)
  }
  const handlePhoneChange=(e)=>{
    setPhone(e.target.value)
  }
  const handleAddressChange=(e)=>{
    setAddress(e.target.value)
  }
  const handleDOBChange=(e)=>{
    setDOB(e.target.value)
  }
  const handleBloodgroupChange=(e)=>{
    setBloodgroup(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (password !== password2) {

   
    } else {
      axios
        .post('http://localhost:5000/register', {
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
          DOB: DOB,
          bloodgroup: bloodgroup
        })
        .then((res) => {
          console.log(res);
          setErrorMessage("Login Successfull");
          window.location.href = '/';
          setName('');
          setEmail('');
          setPassword('');
          setPassword2('');
          setPhone('');
          setAddress('');
          setDOB('');
          setBloodgroup('');
        })
        .catch((err) => {
          console.log(err);
          alert('Registration Failed');
        });
    }
  };
  
  return (
    <div style={{ padding: '40px' }}>
      <div className="register">
        <h1>Register</h1>
        <form  onSubmit={handleSubmit}>
          <div className="flexi">
          <div className='group'>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <br/>
            <input type="text" name="name" id="name" value={name} onChange={handleNameChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <br/>
            <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <br/>
            <input type="password" name="password" id="password" value ={password} onChange={handlePasswordChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password: </label>
            <br/>
            <input type="password" name="password2" id="password2" value={password2} onChange={handlePassword2Change}/>
           
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone: </label>
            <br/>
            <input type="text" name="phone" id="phone" value={phone} onChange={handlePhoneChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address: </label>
            <br/>
            <input type="text" name="address" id="address"  value={address} onChange={handleAddressChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="DOB">Date of Birth: </label>
            <br/>
            <input type="date" name="DOB" id="DOB" value={DOB} onChange={handleDOBChange} />
          </div>
          <div className="form-group">
            <label htmlFor="bloodgroup">Blood Group: </label>
            <br/>
            <select id="bloodgroup" name="bloodgroup" value={bloodgroup} onChange={handleBloodgroupChange}>
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <input type="submit" value="Register" className="btnr" />
          
          </div>
          <div className='welcome'>
              <h1 style={{color:'#415971'}}>welcome to <br/> Clinic_linK.....<FaStethoscope/></h1>
              <img src={doc2} alt="doc" width='400px' height='450px'/>
          </div>
          </div>
        </form>
        <div className="loginre">
      <p>Already an User?<a href='/'> Sign In</a></p>
      </div>
      </div>
      <Foot />
    </div>
  );
};

export default Register;
