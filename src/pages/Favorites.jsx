import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../components/ui/button";
import { HeartOff } from "lucide-react";
import { Link } from "react-router";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/favorites", {
          withCredentials: true,
        });
        // console.log("Recieve favorite car", data);

        setFavorites(data);
        setCars(data.map((fav) => fav.car));
      } catch (error) {
        toast.error("Error loading favorites");
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${carId}`, {
        withCredentials: true,
      });
      setFavorites(favorites.filter((id) => id !== carId));
      setCars(cars.filter((car) => car._id !== carId));
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Error removing favorite");
    }
  };

  if (!cars.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No favorites yet. Browse
        <Link to="/available-cars" className="text-blue-500 underline">
          available cars
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => (
        <div key={car._id} className="border p-4 rounded shadow relative">
          <img
            src={car.imageUrl || car.image}
            alt={car.model}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <h2 className="text-xl font-semibold">{car.model}</h2>
          <p className="text-gray-600">
            ${car.pricePerDay}/day
            <span className="ml-2 text-sm text-orange-600">
              ❤️ {car.favoriteCount || 0}
            </span>
          </p>
          <Button
            onClick={() => removeFavorite(car._id)}
            className="absolute top-2 right-2"
            variant="ghost"
          >
            <HeartOff className="text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
