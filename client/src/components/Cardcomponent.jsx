import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import axios from "axios";

const CardComponent = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/properties")
      .then((res) => setProperties(res.data))
      .catch((err) => alert("Failed to load properties"));
  }, []);

  return (
    <div className="container my-5 text-center">
      <h1>Explore Our Properties</h1>
      <p>Enjoy the variety of 100+ Different properties in the market!</p>

      <div className="row mt-4">
        {properties.length === 0 ? (
          <p>No Properties found</p>
        ) : (
          properties.map((prop) => (
            <div className="col-md-4 mb-4" key={prop.id}>
              <PropertyCard property={prop} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardComponent;
