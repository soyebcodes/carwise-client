import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { TableRow, TableCell } from "../components/ui/table";

const CarRow = ({
  car,
  setSelectedCar,
  setDeleteId,
  handleUpdate,
  handleDelete,
  loading,
  deleteId,
}) => {
  return (
    <TableRow key={car._id}>
      <TableCell>
        <img
          src={car.imageUrl || car.image}
          alt={car.model}
          className="w-26 h-16 object-cover rounded-2xl"
        />
      </TableCell>
      <TableCell>{car.model}</TableCell>
      <TableCell>${car.pricePerDay}</TableCell>
      <TableCell>{car.bookingCount || 0}</TableCell>
      <TableCell>{car.availability}</TableCell>
      <TableCell>{new Date(car.date).toLocaleDateString()}</TableCell>
      <TableCell>
        <div className="flex flex-col md:flex-row gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setSelectedCar(car)}
              >
                Update
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg w-full">
              <DialogHeader>
                <DialogTitle>Update Car</DialogTitle>
              </DialogHeader>
              <form className="space-y-3" onSubmit={handleUpdate}>
                <div>
                  <Label>Model</Label>
                  <Input name="model" defaultValue={car.model} required />
                </div>
                <div>
                  <Label>Price/Day</Label>
                  <Input
                    name="price"
                    type="number"
                    defaultValue={car.pricePerDay}
                    required
                  />
                </div>
                <div>
                  <Label>Availability</Label>
                  <Input
                    name="availability"
                    defaultValue={car.availability}
                    required
                  />
                </div>
                <div>
                  <Label>Registration Number</Label>
                  <Input
                    name="registration"
                    defaultValue={car.registrationNumber}
                    required
                  />
                </div>
                <div>
                  <Label>Features (comma separated)</Label>
                  <Input
                    name="features"
                    defaultValue={car.features?.join(", ")}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea name="description" defaultValue={car.description} />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    name="imageUrl"
                    defaultValue={car.imageUrl || car.image}
                    required
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input name="location" defaultValue={car.location} required />
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Car"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* delete button with confirmation modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                className="cursor-pointer"
                onClick={() => setDeleteId(car._id)}
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this car?</p>
              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setDeleteId(null)}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(deleteId)}
                  className="cursor-pointer"
                >
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CarRow;
