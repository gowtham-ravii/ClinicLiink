// Navbar.js
import React, { useContext } from "react";
import "../styles/nbar.css";
import { FaHome, FaLaptopMedical, FaStethoscope, FaUserEdit, FaRegUser, FaMedkit } from "react-icons/fa";
import { MdContactMail, MdLogin, MdVerifiedUser } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom"; // Import NavLink for active class styling
import { userContext } from "./Login";

const Navbar = () => {
  const location = useLocation();
  const { login, userName,setLogin,setUserName,setUserEmail } = useContext(userContext);
  return (
    <div className="navbar">
      <ul className="nulist">
        {login && <div className="navlist">
          <li>
            <NavLink to="/Home" activeClassName="active-link" >
              <FaHome /> Home
            </NavLink>
          </li>
        </div>}
        {login &&
        <div className="navlist">
          <li>
            <NavLink to="/doctors" activeClassName="active-link">
              <FaMedkit /> Doctors
            </NavLink>
          </li>
        </div>
}
{login &&
        <div className="navlist">
          <li>
            <NavLink to="/appts" activeClassName="active-link">
              <FaLaptopMedical /> Appointments
            </NavLink>
          </li>
        </div>
}
{login &&
        <div className="navlist">
          <li>
            <a href="#contact">
              <MdContactMail /> Contact
            </a>
          </li>
        </div>
}
{login &&
        <div className="navlist">
          <li>
            <NavLink to="/doctorsapply" activeClassName="active-link">
              <MdVerifiedUser /> Apply for Doctor
            </NavLink>
          </li>
        </div>
}
        {
          login && 
          <div className="navlist-right">
              <li>
                <NavLink to="/" activeClassName="active-link" onClick={()=>{setLogin(false)
                                                                            setUserEmail("")
                                                                            setUserName("")}}>
                <MdLogin /> Logout
                </NavLink>
              </li>
            </div>
        }
        {!login && (
          <>
            <div className="navlist-right">
              <li>
                <NavLink to="/register" activeClassName="active-link">
                  <FaRegUser /> Register
                </NavLink>
              </li>
            </div>
            <div className="navlist-right">
              <li>
                <NavLink to="/" activeClassName="active-link">
                       Login
                </NavLink>
              </li>
            </div>
            <div className="navlist-right clinic-link">
              <li>
                <NavLink to="/home" activeClassName="active-link">
                  Clinic_link <FaStethoscope />
                </NavLink>
              </li>
            </div>
          </>
        )}
        {login && (
          <div className="navlist-right clinic-link">
            <li>
              <NavLink to="/userprofile" activeClassName="active-link">
                {userName}
                <FaUserEdit />
              </NavLink>
            </li>
          </div>
        )}
        
      </ul>
    </div>
  );
};

export default Navbar;
