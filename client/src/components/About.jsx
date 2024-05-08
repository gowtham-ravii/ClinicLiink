import React from "react";
import doctor from "../images/doctor.avif";
import "../styles/about.css";
const About = () => {
  return (
    <>
      <div className="abt">
        <img src={doctor} alt="image" />
        <div className="about">
          <h2>About Us: </h2>
          <p>
            With ClinicLink, patients
            can easily schedule appointments with healthcare providers, reducing
            wait times and enhancing convenience. Our user-friendly interface
            ensures a seamless experience for both patients and medical
            professionals.Join us in revolutionizing the
            healthcare industry with ClinicLink - where booking appointments is
            effortless and patient care is paramount.
          </p>
          
          
        </div>
      </div>
    </>
  );
};

export default About;
