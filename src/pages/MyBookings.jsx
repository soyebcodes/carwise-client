import React from "react";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Card } from "../components/ui/card";
import toast from "react-hot-toast";
import Loading from "./Loading";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/my-bookings?email=${user.email}`, {
        withCredentials: true,
      })
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <Loading />;

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-2">No bookings found</h2>
          <p>You haven't booked any cars yet.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mmy Booking</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Car model</th>
              <th className="border px-4 py-2">location</th>
              <th className="border px-4 py-2">Price/Day</th>
              <th className="border px-4 py-2">Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="text-center">
                <td className="border px-4 py-2">{booking.model}</td>
                <td className="border px-4 py-2">{booking.location}</td>
                <td className="border px-4 py-2">${booking.pricePerDay}</td>
                <td className="border px-4 py-2">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
