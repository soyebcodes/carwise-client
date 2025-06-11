import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loading from "./Loading";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/cars`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c) => c._id === id);
        setCar(found);
      });
  }, [id]);

  if (!car) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <img src={car.imageUrl} alt="" className="w-full rounded-md" />
      <h2 className="text-3xl font-bold">{car.model}</h2>
      <p className="text-lg font-medium text-gray-700">
        ${car.pricePerDay}/day
      </p>
      <p className="text-gray-600">Location: {car.location}</p>
      <p>{car.description}</p>
      <p>Features: {car.features.join(", ")}</p>
      <p>
        Availability:
        {car.availability.charAt(0).toUpperCase() + car.availability.slice(1)}
      </p>
      <button className="mt-4 px-4 py-2 bg-primary text-white rounded">
        Book Now
      </button>
    </div>
  );
};

export default CarDetails;
