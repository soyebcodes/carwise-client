import { NavLink, useNavigate } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
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
      to: "/available-cars",
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
            to: "/my-bookings",
            label: "My Bookings",
            icon: <CalendarCheck className="w-4 h-4 mr-2" />,
          },
        ]
      : []),
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "text-sky-600 underline"
        : "text-muted-foreground hover:text-sky-600"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b shadow-sm">
      <div className="max-w-11/12 mx-auto px-4 py-3 flex items-center justify-between">
        {/* logo */}
        <NavLink
          to="/"
          className="text-xl font-bold text-sky-700 dark:text-sky-500"
        >
          <i>CarWise</i>
        </NavLink>

        {/* desktop menu */}
        <div className="hidden md:flex  items-center space-x-4">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.icon}
              {link.label}
            </NavLink>
          ))}

          {/* Auth user profile */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full ring-2 ring-sky-500 cursor-pointer"
                    title={user.displayName || "User name"}
                  />
                ) : (
                  <UserCircle
                    title={user.displayName || "User name"}
                    className="text-sky-500 w-7 h-7 cursor-pointer"
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>
                  {user.displayName || "Logged In"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/add-car")}
                  className="cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Car
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/my-cars")}
                  className="cursor-pointer"
                >
                  <List className="w-4 h-4 mr-2" />
                  My Cars
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/bookings")}
                  className="cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink to="/login">
              <Button className="rounded-full px-4 py-2 text-sm font-medium bg-sky-600 text-white hover:bg-sky-700 transition cursor-pointer">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
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
                    onClick={handleLogout}
                    className="rounded-full mt-2 px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <NavLink to="/login">
                    <Button className="rounded-full px-4 py-2 text-sm font-medium bg-sky-600 text-white hover:bg-sky-700 transition cursor-pointer">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
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
