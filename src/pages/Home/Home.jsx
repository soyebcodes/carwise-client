import React from "react";
import Banner from "./Banner";
import WhyChooseUs from "./WhyChooseUs";
import RecentListing from "./RecentListing";
import { Suspense } from "react";
import Loading from "../../components/Loading";
import SpecialOffers from "../SpecialOffers/SpecialOffers";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={Loading}>
        <RecentListing />
      </Suspense>
      <HowItWorks />
      <WhyChooseUs />

      <SpecialOffers />
    </div>
  );
};

export default Home;
