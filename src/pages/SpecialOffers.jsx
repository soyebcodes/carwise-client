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

const SpecialOffers = () => {
  return (
    <div className="max-w-11/12 mx-auto py-16 px-4 md:px-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">
        🎁 Specail Offers
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`text-white p-6 rounded-xl shadow-lg ${offer.bg}`}
          >
            <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
            <p className="mb-4">{offer.description}</p>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
              {offer.btnText}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
