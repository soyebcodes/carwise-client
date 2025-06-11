import React from "react";
import Banner from "./Banner";
import WhyChooseUs from "./WhyChooseUs";
import RecentListing from "./RecentListing";
import SpecialOffers from "../SpecialOffers";

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <RecentListing />
      <SpecialOffers />
    </div>
  );
};

export default Home;
