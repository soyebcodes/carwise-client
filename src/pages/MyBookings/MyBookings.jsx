import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { format } from "date-fns";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Trash2, CalendarDays } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(
        `https://carwise-server.onrender.com/my-bookings?email=${user.email}`
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    const confirm = await Swal.fire({
      title: "Are you sure you want to cancel this booking?",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    });

    if (confirm.isConfirmed) {
      await axios.patch(
        `https://carwise-server.onrender.com/bookings/${bookingId}/cancel`
      );
      fetchBookings();
      Swal.fire({
        title: "Cencelled!",
        text: "Your Booking has been canccelled!",
        icon: "success",
      });
    }
  };

  const handleModifyDate = async () => {
    if (!startDate || !endDate || !selectedBooking) return;

    if (endDate <= startDate) {
      toast.error("End date must be after start date.");
      return;
    }

    try {
      await axios.patch(
        `https://carwise-server.onrender.com/bookings/${selectedBooking._id}`,
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }
      );
      toast.success("Booking updated!");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update booking", error);
    } finally {
      setDialogOpen(false);
      setSelectedBooking(null);
      setStartDate(null);
      setEndDate(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl text-center font-bold mb-6">My Bookings</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead className="text-left">
            <tr>
              <th className="p-2 font-bold">Car Image</th>
              <th className="p-2 font-bold">Car Model</th>
              <th className="p-2 font-bold">Booking Date</th>
              <th className="p-2 font-bold">Total Price</th>
              <th className="p-2 font-bold">Status</th>
              <th className="p-2 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">
                  <img
                    src={b.carImage}
                    alt={b.model}
                    className="w-20 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="p-2">{b.model}</td>
                <td className="p-2">
                  {format(new Date(b.startDate), "dd-MM-yyyy HH:mm")} →
                  {format(new Date(b.endDate), "dd-MM-yyyy HH:mm")}
                </td>
                <td className="p-2">${b.totalPrice || b.pricePerDay}</td>
                <td className="p-2">
                  <span
                    className={`text-sm  font-medium px-2 py-1 rounded ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2 items-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => handleCancelBooking(b._id)}
                  >
                    <Trash2 className="mr-1 w-4 h-4" />
                    Cancel
                  </Button>

                  <Dialog
                    open={dialogOpen}
                    onOpenChange={(isOpen) => {
                      setDialogOpen(isOpen);
                      if (!isOpen) {
                        setSelectedBooking(null);
                        setStartDate(null);
                        setEndDate(null);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedBooking(b);
                          setStartDate(new Date(b.startDate));
                          setEndDate(new Date(b.endDate));
                          setDialogOpen(true);
                        }}
                      >
                        <CalendarDays className="mr-1 w-4 h-4" />
                        Modify Date
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="space-y-4 w-full">
                      <DialogHeader>
                        <DialogTitle>Modify Booking Date</DialogTitle>
                      </DialogHeader>

                      {/* Responsive grid: 1 column on mobile, 2 on md+ */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium mb-1">New Start Date</p>
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                          />
                        </div>

                        <div>
                          <p className="font-medium mb-1">New End Date</p>
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          onClick={handleModifyDate}
                          disabled={!startDate || !endDate}
                          className="w-full cursor-pointer"
                        >
                          Confirm New Dates
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!bookings.length && (
          <p className="text-center mt-8 text-muted-foreground">
            No bookings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
