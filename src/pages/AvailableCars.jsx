import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { FaThList, FaThLarge } from "react-icons/fa";
import { Link } from "react-router";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get(`http://localhost:5000/available-cars`);
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <select className="border rounded px-2 py-1 text-sm">
            <option value="">Sort By</option>
            <option value="date">Date Added by</option>
            <option value="price">Price by (low to high)</option>
          </select>

          <select className="border rounded px-2 py-1 text-sm">
            <option value="">Sort By</option>
            <option value="date">Date Added by</option>
            <option value="price">Price by (low to high)</option>
          </select>
          {cars.map((car) => (
            <>
              <img
                src={car.imageUrl}
                alt={car.model}
                className="h-48 w-full object-cover rounded-t"
              />
              <h2 className="text-lg font-semibold">{car.model}</h2>
              <p className="text-muted-foreground">${car.pricePerDay}/day</p>
              <p> {car.location}</p>
              <p className="text-sm text-green-600 font-medium">
                {car.availability}
              </p>
            </>
          ))}
        </div>
      </div>

      <Link>
        <Button>Book Now</Button>
      </Link>
    </div>
  );
};

export default AvailableCars;
