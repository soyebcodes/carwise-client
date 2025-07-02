import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import bannerImg from "../../assets/images/banner-img2.jpg";

const Banner = () => {
  return (
    <section
      className="max-w-11/12 mx-auto relative h-[35vh] md:h-[50vh] lg:h-[65vh] xl:h-[70vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center rounded-2xl my-7"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-lime-400 drop-shadow-lg ">
          Drive Your Dreams Today!
        </h1>

        <Link to="/available-cars">
          <Button className="text-lg px-5 py-6 bg-sky-600 hover:bg-sky-700 shadow-lg cursor-pointer">
            View Available Cars
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default Banner;
