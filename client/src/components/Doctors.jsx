import React, { useState, useEffect} from 'react';
import Doctor from './Doctor';
import '../styles/doctors.css';
import Foot from './Foot';
import axios from 'axios';
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);
  
  return (
    <div className="excard" style={{ paddingTop: '40px' }}>
      <h1>Book your Appointment</h1>
      <div className='card'>
        {doctors.map((doctor) => (

          <Doctor key={doctor.id} doctor={doctor} />
 
        ))}
      </div>
      <Foot />
    </div>
  );
};

export default Doctors;
