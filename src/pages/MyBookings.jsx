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

    // use custom api folder later
    axios
      .get(`http://localhost:5000/my-bookings?email=${user.email}`, {
        withCredentials: true,
      })
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed fetching bookings"))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <Loading />;

  if (bookings.length === 0) {
    return (
      <div>
        <Card>
          <h2>No bookings found!</h2>
          <p>You havene't book any car yet! Please book some car</p>
        </Card>
      </div>
    );
  }

  return <div>MyBookings</div>;
};

export default MyBookings;
