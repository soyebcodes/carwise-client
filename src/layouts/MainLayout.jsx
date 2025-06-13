import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
