import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://carwise-server.onrender.com/cars/${id}`)
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
    if (!selectedStartDate || !selectedEndDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    if (selectedEndDate <= selectedStartDate) {
      toast.error("End date must be after start date.");
      return;
    }

    setBookingLoading(true);

    const bookingData = {
      userEmail: user.email,
      carImage: car.imageUrl || car.image,
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
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-background rounded-lg border border-border shadow-md">
      <img
        src={car.imageUrl || car.image}
        alt={car.model}
        className="w-full h-64 object-cover rounded-md"
      />

      <h2 className="text-3xl font-bold text-foreground">{car.model}</h2>
      <p className="text-xl text-primary">${car.pricePerDay}/day</p>
      <p className="text-muted-foreground">
        Location: <span className="font-medium">{car.location}</span>
      </p>
      <p className="text-muted-foreground">
        Status:{" "}
        <span
          className={`font-medium capitalize ${
            car.availability === "available" ? "text-green-600" : "text-red-600"
          }`}
        >
          {car.availability}
        </span>
      </p>
      <p className="text-muted-foreground">
        Features: <span className="font-medium">{car.features.join(", ")}</span>
      </p>
      <p className="text-foreground">{car.description}</p>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-primary hover:bg-primary/90 mt-4"
            onClick={() => setIsDialogOpen(true)}
          >
            Book Now
          </Button>
        </DialogTrigger>

        <DialogContent className="space-y-6">
          <h3 className="text-xl text-center font-semibold text-foreground">
            Confirm Booking
          </h3>

          <ul className="text-muted-foreground space-y-1">
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
              <label
                htmlFor="startDate"
                className="block text-sm font-medium mb-1 text-foreground"
              >
                Start Date
              </label>
              <Calendar
                id="startDate"
                mode="single"
                selected={selectedStartDate}
                onSelect={setSelectedStartDate}
                disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium mb-1 text-foreground"
              >
                End Date
              </label>
              <Calendar
                id="endDate"
                mode="single"
                selected={selectedEndDate}
                onSelect={setSelectedEndDate}
                disabled={(date) =>
                  !selectedStartDate ||
                  date <= selectedStartDate.setHours(0, 0, 0, 0)
                }
              />
            </div>
          </div>

          <Button
            onClick={handleBooking}
            className="w-full bg-primary hover:bg-primary/90"
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
