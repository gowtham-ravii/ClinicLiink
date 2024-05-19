import React, { useState, useContext, useEffect } from 'react';
import Foot from './Foot';
import axios from 'axios';
import '../styles/userprofile.css';
import { userContext } from './Login';
import { FaEdit } from 'react-icons/fa';
const UserProfile = () => {
  const { userName, userEmail,setUserName,setUserEmail } = useContext(userContext);
  const [userData, setUserData] = useState(null);
  const [edit,setEdit]=useState(false);
  const [nuserName,setNuserName]=useState('');
  const [nuserEmail,setNuserEmail]=useState('');
  const [nuserphone,setNuserphone]=useState('');
  const [nuseraddress,setNuseraddress]=useState('');
  const [nuserDOB,setNuserDOB]=useState('');
  const [nuserbloodgroup,setNuserbloodgroup]=useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://clinicliink-3.onrender.com/user/${userEmail}`);
        setUserData(response.data);
        setNuserName(userData.name);
      setNuserDOB(userData.DOB);
      setNuserEmail(userData.email);
      setNuserphone(userData.phone);
      setNuseraddress(userData.address);
      setNuserbloodgroup(userData.bloodgroup);
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
  const changeDate = (date) => {
    if (!date) return ''; // Return empty string if date is undefined
    const appointmentDate = new Date(date);
    const formattedDate = appointmentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
    return formattedDate;
  }
  const handleEdit=()=>{
      setEdit(!edit);
  }
  const submitEditDetails=()=>{
    if(nuserName!=userData.name){
      setUserName(nuserName);
    }
    if(nuserEmail!=userData.email){
      setUserEmail(nuserEmail);
    }

    axios
    .put(`https://clinicliink-3.onrender.com/user/${userEmail}`, {
      name: nuserName,
      email: nuserEmail,
      phone: nuserphone,
      address: nuseraddress,
      DOB: nuserDOB,
      bloodgroup: nuserbloodgroup,
    })
    .then((res) => {
      console.log(res);
      console.log('Details updated successfully');
      // After successful submission, update the state to reflect the changes
      setUserData({
        name: nuserName,
        email: nuserEmail,
        phone: nuserphone,
        address: nuseraddress,
        DOB: nuserDOB,
        bloodgroup: nuserbloodgroup,
      });
      setEdit(false);
    })
    .catch((err) => {
      console.error('Error updating details:', err);
    });
  }
  return (
    <div style={{ paddingTop: '40px' }} className='ubox'>
      <h1><strong>User Profile</strong></h1>
      <p onClick={()=>handleEdit()} className="edit">Edit Details<FaEdit /></p>
      {!edit &&
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
            
          </div>
          <div className="ufle2">
          <div className='userpro'>
              <label htmlFor="address">Address:</label><br/>
              <input type="text" id="address" name="address" value={userData.address} readOnly/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="DOB">Date of Birth:</label><br/>
              <input type="text" id="DOB" name="DOB" value={changeDate(userData.DOB)} readOnly/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="bloodgroup">Blood Group:</label><br/>
              <input type="text" id="bloodgroup" name="bloodgroup" value={userData.bloodgroup} readOnly/><br/>
            </div>
          </div>
      
        </div>
      
      </div>
      }
      {edit &&
        <>
        <div className='userp'>
        <div className="uflex">
          <div className="ufle1">
            <div className='userpro'>
              <label htmlFor="name">Name:</label><br/>
              <input type="text" id="name" name="name" value={nuserName} onChange={(e)=>setNuserName(e.target.value)}/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="email">Email:</label><br/>
              <input type="text" id="email" name="email" value={nuserEmail} onChange={(e)=>setNuserEmail(e.target.value)}/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="phone">Phone:</label><br/>
              <input type="text" id="phone" name="phone" value={nuserphone} onChange={(e)=>setNuserphone(e.target.value)} /><br/>
            </div>
            
          </div>
          <div className="ufle2">
            <div className='userpro'>
              <label htmlFor="address">Address:</label><br/>
              <input type="text" id="address" name="address" value={nuseraddress} onChange={(e)=>setNuseraddress(e.target.value)} /><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="DOB">Date of Birth:</label><br/>
              <input type="date" id="DOB" name="DOB" value={changeDate(nuserDOB)} onChange={(e)=>setNuserDOB(e.target.value)}/><br/>
            </div>
            <div className='userpro'>
              <label htmlFor="bloodgroup">Blood Group:</label><br/>
              <select id="bloodgroup" name="bloodgroup" value={nuserbloodgroup} onChange={(e)=>setNuserbloodgroup(e.target.value)}>
              <option value="">Select</option>
              <option value="O+ve">O+ve</option>
              <option value="O-ve">O-ve</option>
              <option value="A+ve">A+ve</option>
              <option value="A-ve">A-ve</option>
              <option value="B+ve">B+ve</option>
              <option value="B-ve">B-ve</option>
              <option value="AB+ve">AB+ve</option>
              <option value="AB-ve">AB-ve</option>
              </select>
            </div>
          </div>

        </div>
        <button onClick={ submitEditDetails} className='editSubmit'>Submit Details</button>

      </div>

      </>

      }

      <Foot />
    </div>
  );
};

export default UserProfile;
