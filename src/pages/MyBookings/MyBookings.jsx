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
      title: "Cancel booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
    });

    if (confirm.isConfirmed) {
      await axios.patch(
        `https://carwise-server.onrender.com/bookings/${bookingId}/cancel`
      );
      fetchBookings();
      Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
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
    } catch {
      toast.error("Failed to update booking");
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
      <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>

      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left font-semibold">Car</th>
              <th className="p-3 text-left font-semibold">Model</th>
              <th className="p-3 text-left font-semibold">Booking Date</th>
              <th className="p-3 text-left font-semibold">Price</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr
                key={i}
                className="border-t hover:bg-muted/30 transition-colors"
              >
                <td className="p-3">
                  <img
                    src={b.carImage}
                    alt={b.model}
                    className="w-20 h-12 object-cover rounded-md border"
                  />
                </td>
                <td className="p-3 font-medium">{b.model}</td>
                <td className="p-3 text-sm">
                  {format(new Date(b.startDate), "dd-MM-yyyy HH:mm")} →{" "}
                  {format(new Date(b.endDate), "dd-MM-yyyy HH:mm")}
                </td>
                <td className="p-3 font-semibold">
                  ${b.totalPrice || b.pricePerDay}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
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
                <td className="p-3 flex flex-wrap gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
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

                    <DialogContent className="max-w-lg space-y-6">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">
                          Modify Booking Dates
                        </DialogTitle>
                      </DialogHeader>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium mb-2">New Start Date</p>
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                          />
                        </div>
                        <div>
                          <p className="font-medium mb-2">New End Date</p>
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
                          className="w-full"
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
          <div className="py-10 text-center text-muted-foreground">
            <p className="text-lg font-medium">No bookings found</p>
            <p className="text-sm">Once you book a car, it will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
