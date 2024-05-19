import React, { useState, useEffect, useContext } from 'react';
import Foot from './Foot';
import groupdoctor from '../images/group-doctor.png';
import axios from 'axios';
import '../styles/applydoctor.css';
import { userContext } from './Login';

const ApplyDoctors = () => {
  const { userName, userEmail } = useContext(userContext);
  const [qualification, setQualification] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState(''); 
  const [hospital, setHospital] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://clinicliink-3.onrender.com/user/${userEmail}`);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        
      }
    };

    fetchData();
  }, [userEmail]);

  const handleQualificationChange = (e) => {
    setQualification(e.target.value);
  }

  const handleSpecialityChange = (e) => {
    setSpeciality(e.target.value);
  }

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  }

  const handleHospitalChange = (e) => {
    setHospital(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!qualification || !speciality || !experience || !hospital) {
      setErrorMessage("Please fill all the details");
    } else {
      axios
        .post('http://localhost:5000/applydoctor', {
          name: userName,
          email: userEmail,
          phone: userData?.phone || '',
          address: userData?.address || '',
          qualification: qualification,
          speciality: speciality,
          experience: experience,
          hospital: hospital
        })
        .then((res) => {
          console.log(res);
          setQualification('');
          setSpeciality('');
          setExperience('');
          setHospital('');
          setErrorMessage("Application Submitted Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div style={{ padding: '40px' }} className='apply'>
      <h1>Apply to be a Doctor in Clinic_linK</h1>
      <form className='applyform' action="POST" onSubmit={handleSubmit}>
        <div className="appimg">
          <div>
            <div className='applyform'>
              <label htmlFor="name">Name:</label><br />
              <input type="text" id="name" name="name" value={userName} readOnly /><br />
            </div>
            <div className='applyform'>
              <label htmlFor="email">Email:</label><br />
              <input type="text" id="email" name="email" value={userEmail} readOnly /><br />
            </div>
            <div className='applyform'>
              <label htmlFor="phone">Phone:</label><br />
              <input type="text" id="phone" name="phone" value={userData?.phone || ''} readOnly /><br />
            </div>
            <div className='applyform'>
              <label htmlFor="address">Address:</label><br />
              <input type="text" id="address" name="address" value={userData?.address || ''} readOnly /><br />
            </div>
            <div className='applyform'>
              <label htmlFor="qualification">Qualification:</label><br />
              <input type="text" id="qualification" name="qualification" value={qualification} onChange={handleQualificationChange} /><br />
            </div>
            <div className='applyform'>
              <label htmlFor="speciality">Speciality:</label><br />
              <input type="text" id="speciality" name="speciality" value={speciality} onChange={handleSpecialityChange} /><br />
            </div>
            <div className='applyform'>
              <label htmlFor="experience">Experience:</label><br />
              <input type="text" id="experience" name="experience" value={experience} onChange={handleExperienceChange} /><br />
            </div>
            <div className='applyform'>
              <label htmlFor="hospital">Hospital Location:</label><br />
              <input type="text" id="hospital" name="hospital" value={hospital} onChange={handleHospitalChange} /><br />
            </div>
            <input type="submit" value="Submit" id="apbtn" />
            <div className="statusErr">
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
          <div className='quote'>
            <img src={groupdoctor} alt="verify" />
            <p>To cure sometimes, to relieve often, to comfort always.</p>
          </div>
        </div>
      </form>
      <Foot />
    </div>
  )
}

export default ApplyDoctors;
