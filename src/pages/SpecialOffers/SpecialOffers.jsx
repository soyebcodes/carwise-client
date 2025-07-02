import React from "react";
import { motion } from "framer-motion";

const offers = [
  {
    id: 1,
    title: "Weekend Getaway – 15% OFF",
    description:
      "Enjoy a weekend trip with 15% discount on all bookings made for Friday to Sunday.",
    btnText: "Book Now",
    bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Luxury Ride – Only $99/day",
    description:
      "Drive premium cars this holiday season for just $99/day. Limited time offer!",
    btnText: "Learn More",
    bg: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Early Bird Deal – Save More",
    description:
      "Book at least 7 days in advance and get exclusive discounts on select vehicles.",
    btnText: "Reserve Now",
    bg: "bg-gradient-to-r from-green-500 to-emerald-600",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SpecialOffers = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 md:px-10">
      <motion.h2
        className="text-3xl font-bold text-center mb-10"
        variants={titleVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        🎁 Special Offers
      </motion.h2>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {offers.map((offer) => (
          <motion.div
            key={offer.id}
            variants={cardVariants}
            className={`text-white p-6 rounded-xl shadow-lg ${offer.bg}`}
          >
            <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
            <p className="mb-4">{offer.description}</p>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
              {offer.btnText}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SpecialOffers;
