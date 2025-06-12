import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch(() => toast.error("Failed to load car details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      toast.error("You must be logged in to book a car.");
      return;
    }

    if (!car) {
      toast.error("No car data available.");
      return;
    }
    if (bookingLoading) return;

    setBookingLoading(true);

    const bookingData = {
      userEmail: user.email,
      carId: car._id,
      model: car.model,
      location: car.location,
      pricePerDay: car.pricePerDay,
      date: new Date(),
    };

    axios
      .post("http://localhost:5000/bookings", bookingData)
      .then(() => {
        toast.success("Booking confirmed!");
        setIsDialogOpen(false);
      })

      .catch(() => toast.error("Booking failed!"))
      .finally(() => setBookingLoading(false));
  };

  if (loading || !car) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <img
        src={car.imageUrl}
        alt={car.model}
        className="w-full h-64 object-cover rounded-md"
      />

      <h2 className="text-3xl font-bold">{car.model}</h2>
      <p className="text-xl text-gray-800">${car.pricePerDay}/day</p>
      <p className="text-gray-600">Location: {car.location}</p>
      <p className="text-gray-600">
        Availability:
        <span className="font-medium capitalize text-green-700">
          {car.availability}
        </span>
      </p>
      <p className="text-gray-600">Features: {car.features.join(", ")}</p>
      <p className="text-gray-700">{car.description}</p>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-primary text-white mt-4 cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            Book Now
          </Button>
        </DialogTrigger>
        <DialogContent className="space-y-4">
          <h3 className="text-xl font-semibold">Confirm Booking</h3>
          <ul className="text-gray-700 space-y-1">
            <li>
              <strong>Car:</strong> {car.model}
            </li>
            <li>
              <strong>Price/Day:</strong> ${car.pricePerDay}
            </li>
            <li>
              <strong>Location:</strong> {car.location}
            </li>
            <li>
              <strong>User:</strong> {user?.email}
            </li>
          </ul>
          <Button
            onClick={handleBooking}
            className="bg-primary w-full cursor-pointer"
            disabled={bookingLoading}
          >
            {bookingLoading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarDetails;
