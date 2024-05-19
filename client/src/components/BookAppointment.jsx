// BookAppointment.jsx

import React, { useState,useContext } from 'react';
import '../styles/bookappointment.css'
import axios from 'axios';
import { userContext } from './Login';
const BookAppointment = ({ setModalOpen,doctorName,doctorSpeciality,doctorLocation }) => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
  });
  const {userEmail,userName}=useContext(userContext)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
    });
  };

  const handleBookAppointment = (e) => {
    // Add your appointment booking logic here
    e.preventDefault();
    axios.post('https://clinicliink-3.onrender.com/appointment',{
      doctorName:doctorName,
      pemail:userEmail,
      patientName:userName,
      date:appointmentDetails.date,
      time:appointmentDetails.time,
      doctorSpeciality:doctorSpeciality,
      doctorLocation:doctorLocation,
      status:"booked"
      
    })
    .then((res)=>{
      console.log(res);
      console.log("Appointment booked successfully");
      alert("Appointment booked successfully");
    })
    .catch((err)=>{
      console.log(err);
    })

    setModalOpen(false);
  };

  return (
    <div className="book-appointment-modal">
      <div className="modal-content">
        <h2><strong>Book Appointment</strong></h2>
        <div className="input-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={appointmentDetails.date} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" value={appointmentDetails.time} onChange={handleInputChange} />
        </div>
        <div className="button-group">
          <button className="book-btn" onClick={handleBookAppointment}>Book</button>
          <button className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
