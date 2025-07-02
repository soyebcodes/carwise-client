import React from "react";
import Banner from "./Banner";
import WhyChooseUs from "./WhyChooseUs";
import RecentListing from "./RecentListing";
import { Suspense } from "react";
import Loading from "../../components/Loading";
import SpecialOffers from "../SpecialOffers/SpecialOffers";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />

      <HowItWorks />
      <Suspense fallback={Loading}>
        <RecentListing />
      </Suspense>
      <WhyChooseUs />
      <SpecialOffers />
      <Testimonials />
    </div>
  );
};

export default Home;
