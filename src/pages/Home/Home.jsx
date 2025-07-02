import React from "react";
import Banner from "./Banner";
import WhyChooseUs from "./WhyChooseUs";
import RecentListing from "./RecentListing";
import { Suspense } from "react";
import Loading from "../../components/Loading";
import SpecialOffers from "../SpecialOffers/SpecialOffers";

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
