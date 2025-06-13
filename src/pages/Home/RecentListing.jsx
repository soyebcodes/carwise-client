import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { motion } from "framer-motion";

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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <img
              src={car.imageUrl || car.image}
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
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecentListing;
