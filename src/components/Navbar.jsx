import React, { useState } from "react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          CarWise
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/available" className="text-sm font-medium hover:underline">
            Available Cars
          </Link>
          <Link to="/login" className="text-sm font-medium hover:underline">
            Login
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block text-sm font-medium hover:underline"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/available"
            className="block text-sm font-medium hover:underline"
            onClick={toggleMobileMenu}
          >
            Available Cars
          </Link>
          <Link
            to="/login"
            className="block text-sm font-medium hover:underline"
            onClick={toggleMobileMenu}
          >
            Login
          </Link>
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
