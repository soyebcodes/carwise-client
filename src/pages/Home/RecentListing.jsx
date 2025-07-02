import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Heart, HeartOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const RecentListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    axios.get("https://carwise-server.onrender.com/cars").then((res) => {
      const sortedData = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setCars(sortedData.slice(0, 8));
      setLoading(false);
    });
  }, []);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  const sectionVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const titleVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (loading) return <Loading />;

  return (
    <motion.section
      className="py-10 px-4 max-w-7xl mx-auto"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-sky-700"
        variants={titleVariant}
      >
        Recent Listings
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {cars.map((car, i) => (
          <motion.div
            key={car._id}
            className="border rounded-lg overflow-hidden shadow-md"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={i}
          >
            <div className="relative">
              <img
                src={car.imageUrl || car.image}
                alt={car.model}
                className="h-48 w-full object-cover"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => toggleFavorite(car._id)}
                      className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition cursor-pointer"
                    >
                      {favoriteIds.includes(car._id) ? (
                        <Heart className="text-red-500 w-5 h-5" fill="red" />
                      ) : (
                        <HeartOff className="text-gray-500 w-5 h-5" />
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
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{car.model}</h3>
              <p className="text-sm text-gray-600">${car.pricePerDay}/day</p>
              <p className="text-sm">Availability: {car.availability}</p>
              <p className="text-xs text-gray-400">
                Added: {new Date(car.date).toDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecentListing;
