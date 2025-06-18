import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4">
      {/* Newsletter Signup */}
      <div className="container pb-3 border-bottom border-secondary d-flex justify-content-between align-items-center flex-wrap">
        <h5 className="mb-2">Newsletter Signup</h5>
        <input
          type="email"
          placeholder="Enter your email"
          className="form-control w-auto"
          style={{ maxWidth: "300px", borderRadius: "20px" }}
        />
      </div>

      {/* Footer Content */}
      <div className="container py-4 d-flex justify-content-between flex-wrap">
        {/* Logo + Description */}
        <div className="col-md-3 mb-4">
          <h4 className="mb-2">
            <span className="text-primary">●</span> Logo
          </h4>
          <p className="text-muted small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
            nonummy nibh euismod lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed diam nonummy nibh euismod.
          </p>
        </div>

        {/* Footer Links */}
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold mb-2">Explore</h6>
          <ul className="list-unstyled">
            <li>• Lorem Ipsum</li>
            <li>• Lorem Ipsum</li>
            <li>• Lorem Ipsum</li>
            <li>• Lorem Ipsum</li>
          </ul>
        </div>

        <div className="col-md-2 mb-4">
          <h6 className="fw-bold mb-2">Services</h6>
          <ul className="list-unstyled">
            <li>• Lorem Ipsum</li>
            <li>• Lorem Ipsum</li>
            <li>• Lorem Ipsum</li>
            <li>• Lorem Ipsum</li>
          </ul>
        </div>

        <div className="col-md-2 mb-4">
          <h6 className="fw-bold mb-2">Contact</h6>
          <ul className="list-unstyled">
            <li>• Lorem Ipsum</li>
            <li>• Lorem Ipsum</li>
            <li>• Lorem Ipsum</li>
            <li>• Lorem Ipsum</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-secondary text-center py-3">
        <small>© Lorem Ipsum - All rights reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
