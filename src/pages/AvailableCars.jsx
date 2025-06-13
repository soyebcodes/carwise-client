import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { FaThList, FaThLarge, FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "./Loading";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/available-cars?sortBy=${sortBy}&order=${order}`
      );
      setCars(res.data);
    } catch (err) {
      console.error("Failed to fetch cars", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchCars();
  }, [sortBy, order]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Sort By</option>
            <option value="date">Date Added</option>
            <option value="price">Price</option>
          </select>

          <select
            onChange={(e) => setOrder(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <Button variant="outline" onClick={() => setViewMode("grid")}>
            <FaThLarge />
          </Button>
          <Button variant="outline" onClick={() => setViewMode("list")}>
            <FaThList />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Card key={car._id}>
              <img
                src={car.imageUrl || car.image}
                alt={car.model}
                className="h-48 w-full object-cover rounded-t"
              />
              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{car.model}</h2>
                <p className="text-muted-foreground">${car.pricePerDay}/day</p>
                <p className="flex items-center gap-2">
                  <FaLocationArrow /> {car.location}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {car.availability.charAt(0).toUpperCase() +
                    car.availability.slice(1)}
                </p>
                <Link to={`/cars/${car._id}`}>
                  <Button className="bg-primary w-full mt-2 cursor-pointer">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {cars.map((car) => (
            <div
              key={car._id}
              className="flex items-start gap-10 p-4 border rounded-md shadow-sm"
            >
              <img
                src={car.imageUrl || car.image}
                alt={car.model}
                className="h-38 w-48 object-cover rounded-md flex-shrink-0"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{car.model}</h2>
                  <p className="text-muted-foreground mt-1">
                    ${car.pricePerDay}/day
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <FaLocationArrow className="text-gray-500" />
                    {car.location}
                  </p>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    {car.availability.charAt(0).toUpperCase() +
                      car.availability.slice(1)}
                  </p>
                </div>

                <div className="mt-4">
                  <Link to={`/cars/${car._id}`}>
                    <Button size="sm" className="cursor-pointer">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
