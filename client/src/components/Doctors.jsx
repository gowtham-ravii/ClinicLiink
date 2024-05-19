import React, { useState, useEffect} from 'react';
import Doctor from './Doctor';
import '../styles/doctors.css';
import Foot from './Foot';
import axios from 'axios';
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search,setSearch] = useState('');
  const [filteredDoctors,setFilteredDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://clinicliink-3.onrender.com/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);
  useEffect(()=>{
    setFilteredDoctors(doctors.filter(doctor => doctor.name.toLowerCase().includes(search.toLowerCase())
    || doctor.speciality.toLowerCase().includes(search.toLowerCase())
    || doctor.address.toLowerCase().includes(search.toLowerCase())
  ));
  },[search,doctors]);
  
  return (
    <div className="excard" style={{ paddingTop: '40px' }}>
      <h1>Book your Appointment</h1>
      <div className='searchDoc'>
        <input type='text' placeholder='Search Doctors' onChange={e => setSearch(e.target.value)} />
        </div>
      <div className='card'>
        
        {filteredDoctors.map((doctor) => (

          <Doctor key={doctor.id} doctor={doctor} />
 
        ))}
      </div>
      <Foot />
    </div>
  );
};

export default Doctors;
