import React,{useEffect,useState,useContext} from 'react'
import Foot from './Foot';
import axios from 'axios';
import '../styles/appts.css';
import { userContext } from './Login';
const CompletedAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { userEmail } = useContext(userContext);
    const [filteredAppointments,setFilteredAppointments] = useState([]);
    const [search,setSearch] = useState('');
    const [displaySearch,setDisplaySearch] = useState(false);
    const handleTime=(time)=>{
      if(!time) return'';
      let times = time.split(':');
      let hour = times[0];
      let min = times[1];
      let part = hour>12?'PM':'AM';
      min = (min+'').length==1?'0'+min:min;
      hour = hour>12?hour-12:hour;
      hour = (hour+'').length==1?'0'+hour:hour;
      return hour+':'+min+' '+part;
    }
    useEffect(() => {
        const fetchAppointments = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/appointment/${userEmail}`);
            setAppointments(response.data.filter(appointment => appointment.date < new Date().toISOString())); // Filter appointments that are scheduled for future dates
            
          } catch (error) {
            console.error('Error fetching appointments:', error);
          }
        };
      
        fetchAppointments();
      }, []); 
      useEffect(()=>{
        setFilteredAppointments(appointments.filter(appointment => appointment.doctorName.toLowerCase().includes(search.toLowerCase())
        || appointment.doctorSpeciality.toLowerCase().includes(search.toLowerCase())
        || appointment.doctorLocation.toLowerCase().includes(search.toLowerCase())
        || appointment.time.toLowerCase().includes(search.toLowerCase())
        || appointment.date.toLowerCase().includes(search.toLowerCase())
      ));
      },[search,appointments]);

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
  return (
    <div>
       <div style={{ paddingTop: '40px' }} className='tab'>
      <h1>Consulted Appointments</h1>
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
                
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
    <Foot/>
    </div>

  )
}

export default CompletedAppointments
