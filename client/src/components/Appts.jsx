import React, { useState, useEffect, useContext } from 'react';
import Foot from './Foot';
import axios from 'axios';
import '../styles/appts.css';
import { userContext } from './Login';

const Appts = () => {
  const [appointments, setAppointments] = useState([]);
  const { userEmail } = useContext(userContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/appointments/${userEmail}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    fetchAppointments();
  }, []);

  
  return (
    <div style={{ paddingTop: '40px' }} className='tab'>
      <h1>Appointments</h1>
      <div className='tabapp'>
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Time</th>
              <th>Date</th>
              <th>Speciality</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.doctorName}</td>
                <td>{appointment.time}</td>
                <td>{appointment.date}</td>
                <td>{appointment.doctorSpeciality}</td>
                <td>{appointment.doctorLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Foot />
    </div>
  );
};

export default Appts;