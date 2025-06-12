import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";

const MyCars = () => {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/my-cars", {
          withCredentials: true,
        });
        setMyCars(res.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCars();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Cars</h2>
      {myCars.length === 0 ? (
        <p>You haven't added any cars yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myCars.map((car) => (
            <div key={car._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">
                {car.brand} {car.model}
              </h3>
              <p>
                <strong>Location:</strong> {car.location}
              </p>
              <p>
                <strong>Price/Day:</strong> ${car.pricePerDay}
              </p>
              <p className="text-sm text-green-600 font-medium mt-1">
                Status:
                {car.availability.charAt(0).toUpperCase() +
                  car.availability.slice(1)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCars;
