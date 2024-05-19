// App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Appts from './components/Appts';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Doctors from './components/Doctors';
import ApplyDoctors from './components/ApplyDoctors';
import { userContext } from './components/Login';
import CompletedAppointments from './components/CompletedAppointments';

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  return (
    <userContext.Provider value={{ login, setLogin, userName, setUserName, userEmail, setUserEmail }}>
      <Navbar />
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/appts' element={<Appts />} />
        <Route path='/' element={<Login setLogin={setLogin} setUserName={setUserName} setUserEmail={setUserEmail}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/userprofile' element={login ? <UserProfile /> : <Navigate to="/" />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctorsapply' element={<ApplyDoctors />} />
        <Route path='/completedappointments' element={<CompletedAppointments/>}/>
      </Routes>
    </userContext.Provider>
  );
}

export default App;
