import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Outlet />
      {isHome && <Footer />}
    </div>
  );
};

export default MainLayout;
