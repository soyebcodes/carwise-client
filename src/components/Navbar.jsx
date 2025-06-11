import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center p-4 shadow-md bg-white">
        <Link to="/" className="text-xl font-bold">
          CarWise
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/login" className="text-sm font-medium hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-sm font-medium hover:underline">
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
