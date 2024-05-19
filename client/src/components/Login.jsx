// Login.js
import React, { createContext, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import '../styles/Login.css';
import wlelog from '../images/wlelog.png';
import Foot from './Foot';
import axios from 'axios';
export const userContext =createContext()
const Login = ({setLogin, setUserName, setUserEmail}) => {
  const[errorMessage ,setErrorMessage]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/user/login', { email, password })
      .then((res) => {
        if (res.data.message === 'Login Successful') {
          axios.get(`http://localhost:5000/user/${email}`)
          .then((res) => {
            setUserName(res.data.name);
            setErrorMessage('Login Successful');
          })
          setUserEmail(email);
          setLogin(true);
          navigate('/home')
        }
        else{
          setErrorMessage(res.data.error);
        } 
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
      });
  };

  return (
    <div className='LoginBox' style={{ paddingTop: '40px' }}>
      <div className="logdoc">
        <div className='welcomelo'>
          <h1 style={{ color: '#415971' }}>welcome Back!!</h1>
          <img src={wlelog} alt="doc" width='400px' height='450px' />
        </div>

        <div className='box'>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='lbox'>
              <div className='textbox'>
                <input type='text' placeholder='Username' name='username' value={email} onChange={handleEmailChange} required />
              </div>
              <div className='textbox'>
                <input type='password' placeholder='Password' name='password' value={password} onChange={handlePasswordChange} required />
              </div>
              <div className='btm'>
                <input type='submit' className='btn' value='Sign In' />
              </div>
            </div>
          </form>
          <div className="registerlo">
            <p>Not a User?<a href='/register'> Sign Up</a></p>
          </div>
          <div className="errorMessage">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}

export default Login;
