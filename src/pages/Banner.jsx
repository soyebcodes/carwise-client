import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
const Banner = () => {
  return (
    <section className="relative flex items-center justify-center h-64 md:h-[400px] lg:h-[500px]  text-white px-6 text-center overflow-hidden rounded-lg shadow-lg">
      <motion.img />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Drive Your Dreams Today!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          <Link to="/available">
            <Button className="text-lg px-6 py-3 bg-sky-600 hover:bg-sky-700 cursor-pointer">
              View Available Cars
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
