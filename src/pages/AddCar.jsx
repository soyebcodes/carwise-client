import React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddCar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const carData = {
      model: form.model.value,
      pricePerDay: parseFloat(form.price.value),
      availability: form.availability.value.toLowerCase(),
      registrationNumber: form.registration.value,
      features: form.features.value.split(",").map((f) => f.trim()),
      description: form.description.value,
      image: form.image.value,
      location: form.location.value,
      date: new Date(),
      bookingCount: 0,
    };

    try {
      const res = await axios.post(
        "https://carwise-server.onrender.com/cars",
        carData,
        {
          withCredentials: true,
        }
      );

      if (res.data.insertedId) {
        toast.success("Car added successfully!");
        form.reset();
        navigate("/my-cars");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error.message || "Failed to add car.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Add a new car
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input name="model" placeholder="Car Model" required />
        <Input
          name="price"
          type="number"
          placeholder="Daily Rental Price"
          required
        />
        <Input
          name="availability"
          placeholder="Availability (available/unavailable)"
          required
        />
        <Input
          name="registration"
          placeholder="Vehicale Registration Number"
          required
        />
        <Input
          name="features"
          placeholder="Features (comma separated)"
          required
        />
        <Input name="image" placeholder="Image URL" required />
        <Input name="location" placeholder="Location" required />
        <Textarea
          name="description"
          className="border p-2 rounded-md col-span-full"
          placeholder="Description"
          rows={4}
          required
        />

        <Button
          type="submit"
          className="col-span-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Car"}
        </Button>
      </form>
    </div>
  );
};

export default AddCar;
