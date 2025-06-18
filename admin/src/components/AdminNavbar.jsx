// src/components/AdminNavbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AdminNavbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-2">
      <div className="container-fluid">
        <Link to="/admin/dashboard" className="navbar-brand fw-bold fs-4">
          Admin Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          {user && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link active">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/properties" className="nav-link">
                  Properties
                </Link>
              </li>
            </ul>
          )}

          <div className="d-flex ms-auto gap-2">
            {user ? (
              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm btn-outline-light">
                  Login
                </Link>
                <Link to="/register" className="btn btn-sm btn-outline-light">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
