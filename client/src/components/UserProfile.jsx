import React, { useState, useContext, useEffect } from 'react';
import Foot from './Foot';
import axios from 'axios';
import '../styles/userprofile.css';
import { userContext } from './Login';

const UserProfile = () => {
  const { userName, userEmail } = useContext(userContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userEmail}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., show a message to the user
      }
    };

    fetchData();
  }, [userEmail]);

  if (!userData) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div style={{ paddingTop: '40px' }} className='ubox'>
      <h1>User Profile</h1>

      <div className='userp'>
        <div className="uflex">
          <div className="ufle1">
            <div className='userpro'>
              <label htmlFor="name">Name:</label><br/>
              <input type="text" id="name" name="name" value={userData.name} readOnly/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="email">Email:</label><br/>
              <input type="text" id="email" name="email" value={userData.email} readOnly/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="phone">Phone:</label><br/>
              <input type="text" id="phone" name="phone" value={userData.phone} readOnly/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="address">Address:</label><br/>
              <input type="text" id="address" name="address" value={userData.address} readOnly/><br/>
            </div>
          </div>
          <div className="ufle2">
            <div className='userpro'>
              <label htmlFor="DOB">Date of Birth:</label><br/>
              <input type="text" id="DOB" name="DOB" value={userData.DOB} readOnly/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="bloodgroup">Blood Group:</label><br/>
              <input type="text" id="bloodgroup" name="bloodgroup" value={userData.bloodgroup} readOnly/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="numofappointments">Number of Appointments:</label><br/>
              <input type="text" id="numofappointments" name="numofappointments" value="hey" readOnly/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="doctors">Doctors:</label><br/>
              <input type="text" id="doctors" name="doctors" value="hi" readOnly/><br/>
            </div>
          </div>
        </div>
        
      </div>
      <Foot />
    </div>
  );
};

export default UserProfile;
