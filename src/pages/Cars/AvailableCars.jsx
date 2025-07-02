import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { FaThList, FaThLarge, FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { HeartOff } from "lucide-react";
import { Heart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [favoriteIds, setFavoriteIds] = useState([]);

  // debounce function
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://carwise-server.onrender.com/available-cars?sortBy=${sortBy}&order=${order}`
      );
      setCars(res.data);
    } catch (error) {
      console.error("Failed to fetch car", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCars();
  }, [sortBy, order]);

  // search filter
  const filteredCars = cars.filter((car) => {
    const lower = searchTerm.toLowerCase();
    return (
      car.model.toLowerCase().includes(lower) ||
      car.brand?.toLowerCase().includes(lower) ||
      car.location.toLowerCase().includes(lower)
    );
  });

  // favorite
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          "https://carwise-server.onrender.com/favorites",
          {
            withCredentials: true,
          }
        );
        const ids = res.data.map((fav) => fav.carId);
        setFavoriteIds(ids);
      } catch (error) {
        console.error("Error on favoites", error);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (carId) => {
    try {
      const res = await axios.post(
        `https://carwise-server.onrender.com/favorites/${carId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.favorited) {
        setFavoriteIds([...favoriteIds, carId]);
        toast.success("Added to favorites");
      } else {
        setFavoriteIds(favoriteIds.filter((id) => id !== carId));
        toast.success("Removed from favorites");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3 ">
          <Input
            type="text"
            placeholder="Search by model, brand, or location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-2 md:w-64"
          />
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border  rounded px-2 py-1 text-sm"
          >
            <option className="dark:text-white dark:bg-gray-900" value="">
              Sort By
            </option>
            <option className="dark:text-white dark:bg-gray-900" value="date">
              Date Added
            </option>
            <option className="dark:text-white dark:bg-gray-900" value="price">
              Price
            </option>
          </select>

          <select
            onChange={(e) => setOrder(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option className="dark:text-white dark:bg-gray-900" value="">
              Order
            </option>
            <option className="dark:text-white dark:bg-gray-900" value="asc">
              Ascending
            </option>
            <option className="dark:text-white dark:bg-gray-900" value="desc">
              Descending
            </option>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <Card key={car._id} className="relative">
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="absolute top-6 right-2 cursor-pointer"
                        onClick={() => toggleFavorite(car._id)}
                      >
                        {favoriteIds.includes(car._id) ? (
                          <Heart className="text-red-500 w-5 h-5" fill="red" />
                        ) : (
                          <HeartOff className="text-gray-200 w-5 h-5" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      <p>
                        {favoriteIds.includes(car._id)
                          ? "Remove from favorites"
                          : "Add this car to your favorites"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

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
          {filteredCars.map((car) => (
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => toggleFavorite(car._id)}
                        >
                          {favoriteIds.includes(car._id) ? (
                            <Heart
                              className="text-red-500 w-5 h-5"
                              fill="red"
                            />
                          ) : (
                            <HeartOff className="text-gray-200 w-5 h-5" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center">
                        <p>
                          {favoriteIds.includes(car._id)
                            ? "Remove from favorites"
                            : "Add this car to your favorites"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

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
