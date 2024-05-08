import React from 'react';
import CountUp from 'react-countup';
import '../styles/homecircle.css';

const Homecircle = () => {
  return (
    <div className="over">
      <div className="circle">
        <div className="circle-text">
          <h2><CountUp end={1000} duration={2} />+</h2>{/* Duration is in seconds */}
          <p>Doctors</p>
        </div>
      </div>
      <div className="circle">
        <div className="circle-text">
          <h2><CountUp end={5000} duration={3} />+</h2>
          <p>Users</p>
        </div>
      </div>
      <div className="circle">
        <div className="circle-text">
          <h2><CountUp end={100} duration={2.5} />+</h2>
          <p>Specialities</p>
        </div>
      </div>
    </div>
  );
};

export default Homecircle;
