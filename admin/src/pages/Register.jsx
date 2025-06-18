// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { ...form, role: 'admin' });
      alert('Admin registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container col-md-4 mt-5">
      <h3>Admin Register</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input className="form-control my-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="password" className="form-control my-2" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}
