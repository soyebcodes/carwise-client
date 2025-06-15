import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar"; // Adjust path if needed

const CarDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  useEffect(() => {
    axios
      .get(`https://carwise-server.onrender.com/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch(() => toast.error("Failed to load car details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = () => {
    if (!user) return toast.error("You must be logged in to book a car.");
    if (!car) return toast.error("No car data available.");
    if (!selectedStartDate || !selectedEndDate) {
      return toast.error("Please select both start and end dates.");
    }
    if (selectedEndDate <= selectedStartDate) {
      return toast.error("End date must be after start date.");
    }

    setBookingLoading(true);

    const bookingData = {
      userEmail: user.email,
      carImage: car.imageUrl,
      carId: car._id,
      model: car.model,
      location: car.location,
      pricePerDay: car.pricePerDay,
      startDate: selectedStartDate.toISOString(),
      endDate: selectedEndDate.toISOString(),
    };

    axios
      .post("https://carwise-server.onrender.com/bookings", bookingData)
      .then(() => {
        toast.success("Booking confirmed!");
        setIsDialogOpen(false);
        setSelectedStartDate(null);
        setSelectedEndDate(null);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          toast.error(err.response.data.message || "Already booked.");
        } else {
          toast.error("Booking failed!");
        }
      })
      .finally(() => setBookingLoading(false));
  };

  if (loading || !car) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <img
        src={car.imageUrl || car.image}
        alt={car.model}
        className="w-full h-full object-cover rounded-md"
      />

      <h2 className="text-3xl font-bold">{car.model}</h2>
      <p className="text-xl text-gray-800">${car.pricePerDay}/day</p>
      <p className="text-gray-600">Location: {car.location}</p>
      <p className="text-gray-600">
        Status:{" "}
        <span className="font-medium capitalize text-green-700">
          {car.availability}
        </span>
      </p>
      <p className="text-gray-600">Features: {car.features.join(", ")}</p>
      <p className="text-gray-700">{car.description}</p>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-primary  mt-4 cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            Book Now
          </Button>
        </DialogTrigger>
        <DialogContent className="space-y-4">
          <h3 className="text-xl text-center font-semibold">Confirm Booking</h3>
          <ul className="text-gray-700 dark:text-white space-y-1">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Start Date</p>
              <Calendar
                mode="single"
                selected={selectedStartDate}
                onSelect={setSelectedStartDate}
                disabled={(date) => date < new Date()}
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">End Date</p>
              <Calendar
                mode="single"
                selected={selectedEndDate}
                onSelect={setSelectedEndDate}
                disabled={(date) =>
                  !selectedStartDate || date <= selectedStartDate
                }
              />
            </div>
          </div>

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
