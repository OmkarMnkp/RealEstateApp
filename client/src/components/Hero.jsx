import React from "react";
import hero from '../assets/hero.jpg';

const Hero = () => {
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center text-center text-white"
      style={{
        backgroundImage: `url(${hero})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '80px 20px'
      }}
    >
      <h1 className="fw-bold mb-2">YOUR DREAM HOME</h1>
      <h3 className="mb-4">IS ONLY ONE CLICK AWAY</h3>

      <div className="bg-light text-dark p-4 rounded shadow w-75">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-semibold">LOOKING FOR</label>
            <input type="text" className="form-control" placeholder="e.g., Apartment" />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">LOCATION</label>
            <input type="text" className="form-control" placeholder="e.g., Mumbai" />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">PROPERTY SIZE</label>
            <input type="text" className="form-control" placeholder="e.g., 1000 sqft" />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">BUDGET</label>
            <input type="number" className="form-control" placeholder="e.g., 5000000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
