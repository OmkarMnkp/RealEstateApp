import React from "react";
import logo from '../assets/logo.png'; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleNavigate =()=>{
    navigate('/')
  }

  const handleLogin =()=>{
    navigate('/login')
  }

   const handleRegister =()=>{
    navigate('/register')
  }



  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><img src={logo} onClick={handleNavigate} alt="" srcset="" /></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex ms-auto align-items-center">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#" onClick={handleLogin}>Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#" onClick={handleRegister} >Register</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">Contact Us</a>
              </li>
            </ul>
            <button className="btn btn-primary ms-3">Request a call</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
