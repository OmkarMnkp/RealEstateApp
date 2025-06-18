// src/components/PropertyCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/properties/edit/${property.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      onDelete(property.id);
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      {property.imageUrl && (
        <img
          src={`http://localhost:5000/${property.imageUrl}`}
          alt={property.title}
          className="card-img-top rounded-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{property.title}</h5>
        <p className="text-muted mb-1 small">{property.location}</p>
        <p className="fw-semibold text-success mb-3">₹ {property.price.toLocaleString()}</p>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-sm btn-outline-primary" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
