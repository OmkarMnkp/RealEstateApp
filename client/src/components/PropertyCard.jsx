import React from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";

const PropertyCard = ({ property }) => {
    return (
        <div className="card h-100 shadow-sm">
            <img
                src={`http://localhost:5000/${property.imageUrl}`}
                className="card-img-top"
                alt={property.title}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-start">
                <h5 className="card-title fw-bold">{property.title}</h5>
                <p className="card-text text-muted d-flex align-items-center mb-3">
                    <IoLocationOutline className="me-1" />
                    {property.location}
                </p>
                <Link to={`/properties/${property.id}`} className="btn btn-primary w-100">
                    View Details
                </Link>

            </div>
        </div>
    );
};

export default PropertyCard;
