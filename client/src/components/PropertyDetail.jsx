import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PropertyCard from "./PropertyCard";


const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [properties, setProperties] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const fetchProperty = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
            setProperty(res.data);
        } catch (error) {
            toast.error("Failed to load property");
        }
    };

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/properties")
            .then((res) => setProperties(res.data))
            .catch((err) => alert("Failed to load properties"));

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/inquiries", {
                ...form,
                propertyId: property.id,
                propertyTitle: property.title,
            });
            toast.success("Inquiry submitted!");
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            toast.error("Submission failed");
        }
    };

    if (!property) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-4">
                <div>
                    <h2 className="fw-bold">{property.title}</h2>
                    <p className="text-muted mb-1">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {property.location}
                    </p>
                </div>
                <div>
                    <h4 className="fw-bold text-success">₹{property.price.toLocaleString()}/mo</h4>
                </div>
            </div>

            <div className="row g-4">
                {/* Main Image + Thumbnails */}
                <div className="col-lg-8">
                    <img
                        src={`http://localhost:5000/${property.imageUrl}`}
                        alt={property.title}
                        className="img-fluid w-100 rounded-4 mb-3"
                        style={{ maxHeight: "450px", objectFit: "cover" }}
                    />
                    {/* Thumbnails (placeholder same image) */}
                    <div className="d-flex gap-2">
                        {Array(5).fill().map((_, i) => (
                            <img
                                key={i}
                                src={`http://localhost:5000/${property.imageUrl}`}
                                className="rounded-3"
                                style={{ width: "100px", height: "70px", objectFit: "cover" }}
                            />
                        ))}
                    </div>
                </div>

                {/* Inquiry Box */}
                <div className="col-lg-4">
                    <div className="card shadow-sm p-4 border-0 rounded-4">
                        <div className="d-flex align-items-center mb-4">
                            <img
                                src="https://randomuser.me/api/portraits/women/68.jpg"
                                alt="Agent"
                                className="rounded-circle me-3"
                                style={{ width: "50px", height: "50px" }}
                            />
                            <div>
                                <h6 className="mb-0">Martha Stewart</h6>
                                <small className="text-muted">Property Consultant</small>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Your Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Phone (optional)"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    name="message"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Your Message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-pill">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Overview Section */}
            <div className="mt-5 p-4 bg-light rounded-4 shadow-sm">
                <h4 className="fw-semibold mb-4">Overview</h4>
                <div className="row text-center">
                    <div className="col-6 col-md-3 mb-3">
                        <div className="fw-bold">Property Type</div>
                        <div className="text-muted">{property.type}</div>
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <div className="fw-bold">Year Built</div>
                        <div className="text-muted">{property.yearBuilt || "2015"}</div>
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <div className="fw-bold">Size</div>
                        <div className="text-muted">{property.size || "1950"} m²</div>
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <div className="fw-bold">Bedrooms</div>
                        <div className="text-muted">{property.bedrooms || 3}</div>
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <div className="fw-bold">Bathrooms</div>
                        <div className="text-muted">{property.bathrooms || 2}</div>
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <div className="fw-bold">Garage</div>
                        <div className="text-muted">{property.garage || 1}</div>
                    </div>
                </div>
            </div>


            {/* description */}
            '<div className="mt-5 p-4 bg-light rounded-4 shadow-sm">
                <h4 className="fw-semibold mb-4">Description</h4>
                <div className="row text-center">
                    {/* <div className="col-6 col-md-3 mb-3"> */}

                    <p>{property.description}</p>
                    {/* </div> */}

                </div>
            </div>'
            {/* Address Section */}
            <div className="mt-4 p-4 bg-light rounded-4 shadow-sm">
                <h5 className="fw-semibold mb-3">Address</h5>
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <strong>Address:</strong> {property.Address ||"Tower C-804, Skyline Heights, Paud Road" }
                    </div>
                    <div className="col-md-6 mb-2">
                        <strong>Zip/Postal Code:</strong> {property.postalCode || "431001"}
                    </div>
                    <div className="col-md-6 mb-2">
                        <strong>City:</strong> {property.City || "Pune" }
                    </div>
                    <div className="col-md-6 mb-2">
                        <strong>Area:</strong> {property.Area ||"Hindjewadi" }
                    </div>
                    <div className="col-md-6 mb-2">
                        <strong>Country:</strong> {property.Country || "india"}
                    </div>
                </div>
            </div>


            {/* Features Section */}
            <div className="mt-4 p-4 bg-light rounded-4 shadow-sm">
                <h5 className="fw-semibold mb-3">Features</h5>
                <div className="row">
                    <div className="col-md-4">
                        <p><span className="text-primary me-2">✔</span>Air Conditioning</p>
                        <p><span className="text-primary me-2">✔</span>External Yard</p>
                        <p><span className="text-primary me-2">✔</span>Dryer</p>
                        <p><span className="text-primary me-2">✔</span>Gym</p>
                        <p><span className="text-primary me-2">✔</span>Laundry</p>
                    </div>
                    <div className="col-md-4">
                        <p><span className="text-primary me-2">✔</span>Shared Gym</p>
                        <p><span className="text-primary me-2">✔</span>Kitchen Appliances</p>
                        <p><span className="text-primary me-2">✔</span>Outdoor Shower</p>
                        <p><span className="text-primary me-2">✔</span>Two Refrigerators</p>
                        <p><span className="text-primary me-2">✔</span>Club House</p>
                    </div>
                    <div className="col-md-4">
                        <p><span className="text-primary me-2">✔</span>TV Cable</p>
                        <p><span className="text-primary me-2">✔</span>Washer</p>
                    </div>
                </div>
            </div>

            {/* Featured listing */}

            <div className=" container my-5 text-center">
                <h1>Featured Listing</h1>
                <p>Browse our wide range of featured properties.</p>

                <div className="row" >
                    {
                        properties.length === 0 ? (
                            <p>no properties found!</p>
                        ) : (
                            properties.slice(0, 3).map((prop) => (
                                <div className="col-md-4 mb-4" key={prop.id}>
                                    <PropertyCard property={prop} />
                                </div>
                            ))
                        )
                    }

                </div>

            </div>



        </div>
    );
};

export default PropertyDetail;
