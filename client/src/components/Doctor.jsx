// Doctor.jsx

import React, { useState } from 'react';
import BookAppointment from './BookAppointment';
import '../styles/doctors.css';
import Doct from '../images/doc.jpg';

const Doctor = ({ doctor }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleBookAppointment = () => {
    setModalOpen(true);
  };
  
  return (
    <div className="card">
      <div className="doctor-card">
        <div className="doctor-info">
          <div className="doctor-img">
            <img src={Doct} alt="Doctor" />
          </div>
          <div className="doctor-details">
            <h3 className="doctor-name">Dr. {doctor.name}</h3>
            <p className="doctor-specialization">{doctor.speciality}</p>
            <p className="doctor-location">{doctor.address}</p>
          </div>
        </div>
        <button className="book-appointment-btn" onClick={handleBookAppointment}>
          Book Appointment
        </button>
        {modalOpen && <BookAppointment setModalOpen={setModalOpen} doctorName={doctor.name} doctorSpeciality={doctor.speciality} doctorLocation={doctor.address}/>}
      </div>
    </div>
  );
};

export default Doctor;
