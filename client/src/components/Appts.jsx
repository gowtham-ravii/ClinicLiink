import React, { useState, useEffect, useContext } from 'react';
import Foot from './Foot';
import axios from 'axios';
import '../styles/appts.css';
import { userContext } from './Login';
import { FaSearch } from 'react-icons/fa';
const Appts = () => {
  const [appointments, setAppointments] = useState([]);
  const [search,setSearch] = useState('');
  const [displaySearch,setDisplaySearch] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control the visibility of the confirmation message
  const [appointmentIndexToDelete, setAppointmentIndexToDelete] = useState(null); // State to store the index of the appointment to delete
  const { userEmail } = useContext(userContext);
  const [filteredAppointments,setFilteredAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/appointment/${userEmail}`);
        setAppointments(response.data.filter(appointment => appointment.date >= new Date().toISOString())); // Filter appointments that are scheduled for future dates
        
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    fetchAppointments();
  }, []); // Empty dependency array
  
  useEffect(()=>{
    setFilteredAppointments(appointments.filter(appointment => appointment.doctorName.toLowerCase().includes(search.toLowerCase())
    || appointment.doctorSpeciality.toLowerCase().includes(search.toLowerCase())
    || appointment.doctorLocation.toLowerCase().includes(search.toLowerCase())
    || appointment.time.toLowerCase().includes(search.toLowerCase())
    || appointment.date.toLowerCase().includes(search.toLowerCase())
  ));
  },[search,appointments]);

  const handleCancel = (index) => {
    setAppointmentIndexToDelete(index);
    setShowConfirmation(true);
  };

  const confirmCancel = () => {
    const index = appointmentIndexToDelete;
    const appointmentId = appointments[index]._id;
    axios.delete(`https://clinicliink-3.onrender.com/appointment/${appointmentId}`)
      .then((res)=>{
        console.log(res);
        console.log("Appointment cancelled successfully");
        // After successful cancellation, update the state to reflect the changes
        const updatedAppointments = [...appointments];
        updatedAppointments.splice(index, 1);
        setAppointments(updatedAppointments);
      })
      .catch((err)=>{
        console.log(err);
      });
    setShowConfirmation(false); // Hide the confirmation message after canceling
  };

  const cancelCancel = () => {
    setShowConfirmation(false); // Hide the confirmation message without canceling
  };
  const changeDate = (date) => {
    if (!date) return ''; // Return empty string if date is undefined
    const appointmentDate = new Date(date);
    const formattedDate = appointmentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
    return formattedDate;
  };
  const handleTime=(time)=>{
    if(!time) return '';
    let times = time.split(":");
    let hour = times[0];
    let min = times[1];
    let part = hour>12?'PM':'AM';
    min = (min+'').length==1?'0'+min:min;
    hour = hour>12?hour-12:hour;
    hour = (hour+'').length==1?'0'+hour:hour;
    return hour+':'+min+' '+part;
  }

  return (
    <div style={{ paddingTop: '40px' }} className='tab'>
      <h1><strong>Appointments</strong></h1>
      <div className='tabapp'>
        <div className='search'>
        <span class="icon">🔍</span>
        <input type="text" placeholder="Search for Appointments" value={search} onChange={(e)=>{setSearch(e.target.value);
                                                                                           if(search)setDisplaySearch(true);
                                                                                           else setDisplaySearch(false)}} />
        
        </div>
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Time</th>
              <th>Date</th>
              <th>Speciality</th>
              <th>Location</th>
              <th>Cancel</th>
            </tr>
          </thead>      
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>Dr.{appointment.doctorName}</td>
                <td>{handleTime(appointment.time)}</td>
                <td>{changeDate(appointment.date)}</td>
                <td>{appointment.doctorSpeciality}</td>
                <td>{appointment.doctorLocation}</td>
                <td><button onClick={() => handleCancel(index)} className='cancelbtn'>Cancel</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showConfirmation && (
        <div className="confirmation">
          
          <p>Are you sure you want to cancel this appointment</p>
          <p>at {handleTime(appointments[appointmentIndexToDelete].time)} on {changeDate(appointments[appointmentIndexToDelete].date)} for Dr.{appointments[appointmentIndexToDelete].doctorName} ?? </p>
          <button onClick={confirmCancel}>Yes</button>
          <button onClick={cancelCancel}>No</button>
        </div>
      )}
      <Foot />
    </div>
  );
};

export default Appts;
