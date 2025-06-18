import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const InquirySection = () => {
  const [form, setForm] = useState({
    inquiryType: "Renting Property",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/general-inquiries", form);
      toast.success("Inquiry submitted successfully!");
      setForm({
        inquiryType: "Renting Property",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      toast.error("Failed to submit inquiry.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3 py-5"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <div
        className="row bg-dark bg-opacity-50 p-4 rounded w-100"
        style={{ maxWidth: "1200px" }}
      >
        {/* Left Side */}
        <div className="col-md-6 mb-4 text-white">
          <h2 className="fw-bold mb-4">
            Why Our Service Is The Perfect Choice?
          </h2>
          <div className="mb-3">
            <h5>01. Lorem Ipsum</h5>
            <p className="text-light small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod.
            </p>
          </div>
          <div className="mb-3">
            <h5>02. Lorem Ipsum</h5>
            <p className="text-light small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod.
            </p>
          </div>
          <div className="mb-3">
            <h5>03. Lorem Ipsum</h5>
            <p className="text-light small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="col-md-6 d-flex justify-content-center">
          <div
            className="bg-white text-dark rounded p-4 shadow"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h5 className="fw-bold mb-3">Real Estate Inquiry Form</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Inquiry Type</label>
                <select
                  name="inquiryType"
                  className="form-select"
                  value={form.inquiryType}
                  onChange={handleChange}
                >
                  <option>Renting Property</option>
                  <option>Buying Property</option>
                  <option>Selling Property</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="example@domain.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone (Optional)</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="+1 (123) 456-0509"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="3"
                  placeholder="Please enter your message"
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquirySection;
