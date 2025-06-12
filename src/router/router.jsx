import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home/Home";
import AvailableCars from "../pages/AvailableCars";
import CarDetails from "../pages/CarDetails";
import AddCar from "../pages/AddCar";
import MyCars from "../pages/MyCars";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
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
        path: "car/:id",
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
            <h2>My Bookings</h2>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
