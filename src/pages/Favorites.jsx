import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get("/favorites");
        const ids = data.map((fav) => fav.carId);
        setFavorites(ids);

        const carData = await Promise.all(
          ids.map((id) => axios.get(`/cars/${id}`).then((res) => res.data))
        );
        setCars(carData);
      } catch (err) {
        console.error("Error loading favorites", err);
      }
    };

    fetchFavorites();
  }, []);
  return <div>Favorites{cars.length}</div>;
};

export default Favorites;
