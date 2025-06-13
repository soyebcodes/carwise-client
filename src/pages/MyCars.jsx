import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import toast from "react-hot-toast";

import { Link } from "react-router";
import CarRow from "./CarRow";

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://carwise-server.onrender.com/my-cars",
        {
          withCredentials: true,
        }
      );
      setCars(res.data);
    } catch (error) {
      toast.error("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://carwise-server.onrender.com/cars/${id}`, {
        withCredentials: true,
      });
      setCars(cars.filter((car) => car._id !== id));
      toast.success("Car deleted successfully");
    } catch {
      toast.error("Failed to delete car");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const updatedCar = {
      model: form.model.value,
      pricePerDay: parseFloat(form.price.value),
      availability: form.availability.value,
      registrationNumber: form.registration.value,
      features: form.features.value.split(",").map((f) => f.trim()),
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      location: form.location.value,
    };

    try {
      await axios.put(
        `https://carwise-server.onrender.com/cars/${selectedCar._id}`,
        updatedCar,
        {
          withCredentials: true,
        }
      );
      toast.success("Car updated successfully!");
      fetchCars();
      setSelectedCar(null);
    } catch (error) {
      toast.error("Failed to update car");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (cars.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold mb-2">No cars added yet.</h2>
        <Link to="/add-car" className="text-blue-600 underline">
          Click here to add a car
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto overflow-x-auto">
      <h1 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
        My Cars
      </h1>

      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Price/Day</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <CarRow
              key={car._id}
              car={car}
              setSelectedCar={setSelectedCar}
              setDeleteId={setDeleteId}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              loading={loading}
              deleteId={deleteId}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyCars;
