import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

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
      features: form.features.value.split(",").map((feature) => feature.trim()),
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
        { withCredentials: true }
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
    <div className="max-w-3xl mx-auto px-6 py-12 bg-background rounded-lg shadow-md border border-border">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Add a New Car
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Input name="model" placeholder="Car Model" required />
        <Input
          name="price"
          type="number"
          min="0"
          step="0.01"
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
          placeholder="Vehicle Registration Number"
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
          placeholder="Description"
          rows={4}
          required
          className="col-span-full resize-none"
        />

        <Button
          type="submit"
          className="col-span-full"
          disabled={loading}
          size="lg"
        >
          {loading ? "Adding..." : "Add Car"}
        </Button>
      </form>
    </div>
  );
};

export default AddCar;
