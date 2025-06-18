import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Properties() {
  const [properties, setProperties] = useState([]);

  const fetchProperties = () => {
    api
      .get('/properties')
      .then((res) => setProperties(res.data))
      .catch(() => alert('Failed to load properties'));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await api.delete(`/properties/${id}`);
      fetchProperties();
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark">🏡 Manage Properties</h3>
        <Link to="/admin/properties/new" className="btn btn-success btn-sm">
          + Add New
        </Link>
      </div>

      <div className="row g-4">
        {properties.length === 0 ? (
          <div className="text-center text-muted fs-5 w-100 mt-5">
            No properties found.
          </div>
        ) : (
          properties.map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden">
                {p.imageUrl && (
                  <img
                    src={`http://localhost:5000/${p.imageUrl}`}
                    alt={p.title}
                    className="card-img-top"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderBottom: '1px solid #ddd',
                    }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark">{p.title}</h5>
                  <p className="text-muted small mb-3">
                    📍 {p.location} <br /> 💰 ₹{p.price.toLocaleString()}
                  </p>

                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/admin/properties/edit/${p.id}`}
                      className="btn btn-outline-primary btn-sm rounded-pill"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="btn btn-outline-danger btn-sm rounded-pill"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
