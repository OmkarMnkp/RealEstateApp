import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';

export default function MyDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalInteractions: 0,
  });
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [generalInquiries, setGeneralInquiries] = useState([]);

  useEffect(() => {
    fetchOverview();
    fetchProperties();
    fetchInquiries();
    fetchGeneralInquiries();
  }, []);

  const fetchOverview = async () => {
    try {
      const res = await api.get('/admin/overview');
      setStats(res.data);
    } catch {
      alert('Error loading stats');
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await api.get('/properties');
      setProperties(res.data);
    } catch {
      alert('Failed to load properties');
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await api.get('/inquiries');
      setInquiries(res.data);
    } catch {
      alert('Failed to load inquiries');
    }
  };

  const fetchGeneralInquiries = async () => {
    try {
      const res = await api.get('/general-inquiries');
      setGeneralInquiries(res.data);
    } catch {
      alert('Failed to load general inquiries');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter((p) => p.id !== id));
      fetchOverview();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-5 text-primary display-5">🏠 Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="row g-4 mb-4">
        <DashboardStatCard title="Users" value={stats.totalUsers} icon="👤" bgColor="primary" />
        <DashboardStatCard title="Properties" value={stats.totalProperties} icon="🏡" bgColor="success" />
        <DashboardStatCard title="Interactions" value={stats.totalInteractions} icon="💬" bgColor="warning" />
      </div>

      {/* Property Section */}
      <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
        <h4 className="fw-semibold text-dark">📋 All Properties</h4>
      </div>

      <div className="row g-4">
        {properties.length === 0 ? (
          <div className="text-muted text-center mt-4">No properties found.</div>
        ) : (
          properties.map((property) => (
            <div className="col-md-4" key={property.id}>
              <PropertyCard property={property} onDelete={handleDelete} />
            </div>
          ))
        )}
      </div>

      {/* Inquiries Section */}
      <h4 className="fw-semibold mt-5 mb-3 text-dark">📨 Interested Inquiries</h4>
      <div className="table-responsive shadow rounded overflow-hidden">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light text-center">
            <tr>
              <th>Property</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">No inquiries found.</td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>
                    <strong>{inq.Property?.title || 'N/A'}</strong><br />
                    <small className="text-muted">{inq.Property?.location || ''}</small>
                  </td>
                  <td>{inq.name}</td>
                  <td>{inq.email}</td>
                  <td>{inq.phone}</td>
                  <td>{inq.message}</td>
                  <td className="text-nowrap">{new Date(inq.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* General Inquiries Section */}
      <h4 className="fw-semibold mt-5 mb-3 text-dark">📥 General Inquiries</h4>
      <div className="table-responsive shadow rounded overflow-hidden">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light text-center">
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {generalInquiries.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">No general inquiries found.</td>
              </tr>
            ) : (
              generalInquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>{inq.inquiryType}</td>
                  <td>{inq.name}</td>
                  <td>{inq.email}</td>
                  <td>{inq.phone || '—'}</td>
                  <td>{inq.message}</td>
                  <td className="text-nowrap">{new Date(inq.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styled Stat Card Component
function DashboardStatCard({ title, value, icon, bgColor = 'light' }) {
  return (
    <div className="col-md-4">
      <div className={`card text-center shadow-sm h-100 border-0 bg-${bgColor} text-white`}>
        <div className="card-body py-4">
          <div className="fs-1 mb-3">{icon}</div>
          <h5 className="card-title">{title}</h5>
          <h2 className="fw-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
}
