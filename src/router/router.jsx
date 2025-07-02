import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import AvailableCars from "../pages/Cars/AvailableCars";
import CarDetails from "../pages/Cars/CarDetails";
import AddCar from "../pages/Cars/AddCar";
import MyCars from "../pages/Cars/MyCars";
import PrivateRoute from "./PrivateRoute";
import MyBookings from "../pages/MyBookings/MyBookings";
import NotFound from "../components/NotFound";
import Favorites from "../pages/Favorites/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "available-cars",
        Component: AvailableCars,
      },
      {
        path: "cars/:id",
        Component: CarDetails,
      },
      {
        path: "add-car",
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: "my-cars",
        element: (
          <PrivateRoute>
            <MyCars />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
