import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast'; 

export default function PropertyForm() {
  const [data, setData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    type: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/properties/${id}`).then((res) => {
        setData(res.data);
        if (res.data.imageUrl) {
          setPreview(`http://localhost:5000/${res.data.imageUrl}`);
        }
      }).catch(() => toast.error('Failed to load property data'));
    }
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to submit property');
      return;
    }

    try {
      if (id) {
        await api.put(`/properties/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Property updated successfully');
      } else {
        const formData = new FormData();
        Object.entries(data).forEach(([key, val]) => formData.append(key, val));
        if (image) formData.append('image', image);

        await api.post('/properties', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Property created successfully');
      }

      navigate('/admin/properties');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-8 mx-auto">
        <div className="card shadow-sm p-4">
          <h3 className="mb-4 text-center">{id ? 'Edit' : 'Add'} Property</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-3">
              {['title', 'price', 'location', 'type'].map((field) => (
                <div className="col-md-6" key={field}>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={data[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="col-12">
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  rows={4}
                  value={data.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Upload Property Image</label>
                <input type="file" className="form-control" onChange={handleImageChange} />
              </div>

              {preview && (
                <div className="col-12">
                  <img
                    src={preview}
                    alt="preview"
                    className="img-fluid rounded border mt-3"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div className="col-12 text-end">
                <button className="btn btn-success px-4">
                  {id ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
