import React from "react";
import Banner from "./Banner";
import WhyChooseUs from "./WhyChooseUs";
import RecentListing from "./RecentListing";
import SpecialOffers from "../SpecialOffers";
import { Suspense } from "react";
import Loading from "../Loading";

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <Suspense fallback={Loading}>
        <RecentListing />
      </Suspense>
      <SpecialOffers />
    </div>
  );
};

export default Home;
