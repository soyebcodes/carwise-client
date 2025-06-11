import { NavLink, useNavigate } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../components/ui/button";
import { AuthContext } from "../context/AuthContext";
import {
  Home,
  Car,
  LogIn,
  LogOut,
  Plus,
  Menu,
  UserCircle,
  List,
  CalendarCheck,
} from "lucide-react";
import { use } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4 mr-2" /> },
    {
      to: "/available",
      label: "Available Cars",
      icon: <Car className="w-4 h-4 mr-2" />,
    },
    ...(user
      ? [
          {
            to: "/add-car",
            label: "Add Car",
            icon: <Plus className="w-4 h-4 mr-2" />,
          },
          {
            to: "/my-cars",
            label: "My Cars",
            icon: <List className="w-4 h-4 mr-2" />,
          },
          {
            to: "/bookings",
            label: "My Bookings",
            icon: <CalendarCheck className="w-4 h-4 mr-2" />,
          },
        ]
      : []),
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "text-orange-600 underline"
        : "text-muted-foreground hover:text-orange-500"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b shadow-sm">
      <div className="max-w-11/12 mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold text-orange-600">
          CarWise
        </NavLink>

        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.icon}
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full ring-2 ring-orange-400"
                />
              ) : (
                <UserCircle className="text-orange-400 w-7 h-7" />
              )}
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-md bg-amber-700 text-white"
                  : "btn btn-md bg-amber-600 text-white hover:bg-amber-700"
              }
            >
              Login
            </NavLink>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={linkClass}
                    onClick={() => {}}
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                ))}

                {user ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-md bg-amber-700 text-white"
                        : "btn btn-md bg-amber-600 text-white hover:bg-amber-700"
                    }
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
