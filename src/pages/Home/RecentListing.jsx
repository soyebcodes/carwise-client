import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";

const RecentListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/cars").then((res) => {
      const sortedData = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setCars(sortedData.slice(0, 6));
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-sky-700">
        Recent Listings
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car._id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={car.imageUrl}
              alt=""
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{car.model}</h3>
              <p className="text-sm text-gray-600">${car.pricePerDay}/day</p>
              <p className="text-sm">Availability: {car.availability}</p>
              <p className="text-xs text-gray-400">
                Added: {new Date(car.date).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListing;
