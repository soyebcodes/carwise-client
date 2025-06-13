import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
