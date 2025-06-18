// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'admin') return alert('Admin access only');

      login(token, payload);
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container col-md-4 mt-5">
      <h3>Admin Login</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="form-control my-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
